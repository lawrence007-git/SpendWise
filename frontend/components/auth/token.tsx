"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default async function Notes() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);

  const token = await getToken();
  fetch("http://localhost:4000/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    async function load() {
      const token = await getToken(); // fresh token from Clerk
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(await res.json());
    }
    load();
  }, [isLoaded, isSignedIn]);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
