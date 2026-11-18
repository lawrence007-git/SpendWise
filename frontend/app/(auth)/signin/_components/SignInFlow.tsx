"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useSignIn } from "@clerk/nextjs";
import {
  signInSchema,
  getFieldErrors,
  type FieldErrors,
} from "@/lib/validation";

export function useSignInFlow() {
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (isSignedIn) router.replace("/dashboard");
  }, [isSignedIn, router]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = signInSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    if (!signIn) return;

    const result = await signIn.password({
      identifier: parsed.data.username,
      password: parsed.data.password,
    });

    if (result.error) {
      setNotice("Incorrect username or password.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => router.push(decorateUrl("/dashboard")),
      });
    } else {
      setNotice("Extra verification is required.");
    }
  }

  function handleGoogleSignIn() {
    setNotice("Google sign-in is not connected yet.");
  }

  return {
    isSignedIn,
    isSubmitting: fetchStatus === "fetching",
    errors,
    notice,
    handleSignIn,
    handleGoogleSignIn,
  };
}
