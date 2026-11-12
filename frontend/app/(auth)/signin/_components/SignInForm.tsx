"use client";

import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { AuthForm } from "../../_components/AuthForm";
import { AuthField, PasswordField } from "../../_components/AuthField";
import {
  signInSchema,
  getFieldErrors,
  fields,
  type FieldErrors,
} from "@/lib/validation";

export function SignInForm() {
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = signInSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }
    setErrors({});

    const { error } = await signIn.password({
      identifier: parsed.data.username,
      password: parsed.data.password,
    });

    if (error) {
      setNotice("Incorrect username or password.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: () => router.push("/dashboard") });
    } else {
      setNotice("Extra verification is required.");
    }
  }

  useEffect(() => {
    if (isSignedIn) router.replace("/dashboard");
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  return (
    <AuthForm
      mode="signin"
      notice={notice}
      onGoogleClick={() => setNotice("Google sign-in is not connected yet.")}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <AuthField {...fields.username} error={errors.username} />
        <PasswordField
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password}
          show={showPassword}
          onToggle={() => setShowPassword((v) => !v)}
        />
        <Button
          type="submit"
          size="lg"
          className="h-10 w-full"
          disabled={fetchStatus === "fetching"}
        >
          Sign in
          <ArrowRight />
        </Button>
      </form>
    </AuthForm>
  );
}
