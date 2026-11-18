"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField, PasswordField } from "../../_components/AuthField";
import { fields, type FieldErrors } from "@/lib/validation";

interface SignInFieldsFormProps {
  errors: FieldErrors;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SignInFieldsForm({
  errors,
  isSubmitting,
  onSubmit,
}: SignInFieldsFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 animate-fade-up">
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
        className="h-10 w-full bg-gradient-brand text-primary-foreground shadow-soft hover:opacity-90"
        disabled={isSubmitting}
      >
        Sign in
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
