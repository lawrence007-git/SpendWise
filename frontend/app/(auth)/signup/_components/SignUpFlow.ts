"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useSignUp, useClerk } from "@clerk/nextjs";
import {
  signUpSchema,
  getFieldErrors,
  type FieldErrors,
} from "@/lib/validation";

export function useSignUpFlow() {
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const clerk = useClerk();

  const [code, setCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    clerk.client?.resetSignUp();
  }, [clerk]);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = signUpSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    if (!signUp) return;

    const { error } = await signUp.password({
      emailAddress: parsed.data.email,
      password: parsed.data.password,
      username: parsed.data.username,
      firstName: parsed.data.name,
    });

    if (error) {
      setNotice(error.message ?? "Could not create your account.");
      return;
    }

    setUserEmail(parsed.data.email);
    await signUp.verifications.sendEmailCode();
    setVerifying(true);
  }

  async function handleVerify(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setNotice("");

    if (code.length < 6) {
      setNotice("Please enter the 6-digit code.");
      return;
    }

    if (!signUp) return;

    const result = await signUp.verifications.verifyEmailCode({ code });
    if (result.error) {
      setNotice("That code is incorrect or expired. Please try again.");
      setCode("");
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => router.push(decorateUrl("/dashboard")),
      });
    }
  }

  async function handleResendCode() {
    await signUp?.verifications.sendEmailCode();
  }

  async function handleStartOver() {
    await clerk.client?.resetSignUp();
    setVerifying(false);
    setCode("");
    setUserEmail("");
    setNotice("");
  }

  async function handleBackToHome() {
    await clerk.client?.resetSignUp();
    window.location.href = "/";
  }

  return {
    isSignedIn,
    code,
    setCode,
    userEmail,
    errors,
    notice,
    verifying,
    handleRegister,
    handleVerify,
    handleResendCode,
    handleStartOver,
    handleBackToHome,
  };
}
