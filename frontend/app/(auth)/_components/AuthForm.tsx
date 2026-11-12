"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type AuthMode = "signin" | "signup";

type AuthFormProps = {
  mode: AuthMode;
  notice?: string;
  onGoogleClick: () => void;
  children: ReactNode;
};

export function AuthForm({
  mode,
  notice,
  onGoogleClick,
  children,
}: AuthFormProps) {
  const signup = mode === "signup";

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-5">
        <div className="mb-3 grid size-9 place-items-center rounded-lg bg-accent text-primary">
          <LockKeyhole className="size-5" />
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight">
          {signup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {signup
            ? "Start your money journey with SpendWise."
            : "Sign in to your SpendWise account."}
        </p>
      </div>

      {children}

      <div className="my-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-full"
        onClick={onGoogleClick}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.31 2.98-7.36ZM12 22c2.7 0 4.96-.9 6.62-2.41l-3.23-2.51c-.89.6-2.03.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.59A10 10 0 0 0 12 22ZM6.4 13.92a6 6 0 0 1 0-3.84V7.49H3.06a10 10 0 0 0 0 9.02l3.34-2.59ZM12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.34 2.59C7.19 7.72 9.4 5.96 12 5.96Z" />
        </svg>
        {signup ? "Sign up with Google" : "Sign in with Google"}
      </Button>

      {notice && (
        <p
          role="status"
          className="mt-4 rounded-md border border-border bg-muted p-3 text-sm leading-relaxed text-muted-foreground"
        >
          {notice}
        </p>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {signup ? "Already have an account? " : "New to SpendWise? "}
        <Link
          href={signup ? "/signin" : "/signup"}
          className="font-semibold text-primary hover:underline"
        >
          {signup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
