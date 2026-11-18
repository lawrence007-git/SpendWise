"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField, PasswordField } from "../../_components/AuthField";
import { fields, type FieldErrors } from "@/lib/validation";

interface SignUpDetailsFormProps {
  errors: FieldErrors;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBackToHome: () => void;
}

export function SignUpDetailsForm({
  errors,
  onSubmit,
  onBackToHome,
}: SignUpDetailsFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-up"
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
      <Button
        type="submit"
        size="lg"
        className="h-10 w-full sm:col-span-2 bg-gradient-brand text-primary-foreground shadow-soft hover:opacity-90"
      >
        Create account
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
