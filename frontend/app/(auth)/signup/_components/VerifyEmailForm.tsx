"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyEmailFormProps {
  userEmail: string;
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: (event?: FormEvent<HTMLFormElement>) => void;
  onResendCode: () => void;
  onStartOver: () => void;
}

export function VerifyEmailForm({
  userEmail,
  code,
  onCodeChange,
  onVerify,
  onResendCode,
  onStartOver,
}: VerifyEmailFormProps) {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold tracking-tight">
          Check your email
        </h3>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit verification code to{" "}
          <span className="font-medium text-foreground">{userEmail}</span>.
          Enter it below.
        </p>
      </div>

      <form onSubmit={onVerify} className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={onCodeChange}
            onComplete={() => onVerify()}
            autoFocus
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-11 rounded-md border border-input bg-background text-lg font-semibold shadow-soft transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-10 w-full bg-gradient-brand text-primary-foreground shadow-soft hover:opacity-90"
        >
          Verify email
        </Button>

        <div className="flex justify-between items-center gap-2 pt-2 text-sm">
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={onResendCode}
          >
            Didn't get a code? Resend
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={onStartOver}
          >
            Use different email
          </button>
        </div>
      </form>
    </div>
  );
}
