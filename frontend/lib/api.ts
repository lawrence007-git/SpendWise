"use client";
import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function useApi() {
  const { getToken } = useAuth();

  return useCallback(
    async <T>(path: string, options: RequestInit = {}): Promise<T> => {
      let token = await getToken();
      if (!token) {
        // Clerk can report signed-in a moment before a token is available after a refresh
        await new Promise((r) => setTimeout(r, 300));
        token = await getToken({ skipCache: true });
      }

      const headers = new Headers(options.headers);
      // Only set JSON content-type when sending a body (bodiless PATCH would fail otherwise)
      if (options.body != null && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (token) headers.set("Authorization", `Bearer ${token}`);

      const res = await fetch(`${API_URL}${path}`, { ...options, headers });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }
      return data as T;
    },
    [getToken],
  );
}
