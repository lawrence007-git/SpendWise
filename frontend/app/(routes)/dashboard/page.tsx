"use client";

import { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";

export default function DashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    // Wait until Clerk has finished loading, and only run if signed in
    if (!isLoaded || !isSignedIn) return;

    async function testApi() {
      try {
        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setResult(`Status ${res.status}: ${JSON.stringify(data)}`);
      } catch (err) {
        setResult(
          "Could not reach the API. Is it running on port 4000? " + String(err),
        );
      }
    }

    testApi();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>API says: {result}</p>
      <button onClick={() => signOut({ redirectUrl: "/signin" })}>
        Sign out
      </button>
    </div>
  );
}
