"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthForm } from "../../_components/AuthForm";
import { AuthField, PasswordField } from "../../_components/AuthField";
import {
  signUpSchema,
  getFieldErrors,
  fields,
  type FieldErrors,
} from "@/lib/validation";

export function SignUpForm() {
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const [verifying, setVerifying] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = signUpSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setErrors({});

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

    await signUp.verifications.sendEmailCode();
    setVerifying(true);
  }

  // Stage 2: check the code the user typed
  async function verify(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setNotice("");

    if (code.length < 6) {
      setNotice("Please enter the 6-digit code.");
      return;
    }

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setNotice("That code is incorrect or expired. Please try again.");
      setCode("");
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({ navigate: () => router.push("/dashboard") });
    }
  }

  if (isSignedIn) return null;

  return (
    <AuthForm mode="signup" notice={notice} onGoogleClick={() => {}}>
      {verifying ? (
        <form onSubmit={verify} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We emailed you a code. Enter it below.
          </p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              onComplete={() => verify()}
              autoFocus
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-11 rounded-md border border-input text-lg first:rounded-md first:border last:rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" className="h-10 w-full">
            Verify email
          </Button>

          <button
            type="button"
            className="w-full text-sm text-cyan-400 hover:underline"
            onClick={() => signUp.verifications.sendEmailCode()}
          >
            Didn't get a code? Resend
          </button>
        </form>
      ) : (
        <form
          onSubmit={submit}
          noValidate
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <AuthField {...fields.name} error={errors.name} />
          <AuthField {...fields.username} error={errors.username} />
          <div className="sm:col-span-2">
            <AuthField {...fields.email} error={errors.email} />
          </div>
          <PasswordField
            autoComplete="new-password"
            placeholder="Create a password"
            error={errors.password}
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
          <AuthField
            {...fields.confirmPassword}
            type={showPassword ? "text" : "password"}
            error={errors.confirmPassword}
          />
          <Button type="submit" size="lg" className="h-10 w-full sm:col-span-2">
            Create account
            <ArrowRight />
          </Button>
        </form>
      )}
    </AuthForm>
  );
}
