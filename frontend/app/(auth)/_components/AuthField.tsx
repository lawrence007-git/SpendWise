import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

type AuthFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete: string;
  maxLength: number;
  error?: string;
};

export function AuthField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  maxLength,
  error,
}: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="h-10 bg-background"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type PasswordFieldProps = {
  autoComplete: "current-password" | "new-password";
  placeholder: string;
  error?: string;
  show: boolean;
  onToggle: () => void;
};

export function PasswordField({
  autoComplete,
  placeholder,
  error,
  show,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={128}
          className="h-10 bg-background pr-12"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "password-error" : undefined}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          title={show ? "Hide password" : "Show password"}
          className="absolute right-1 top-0.5 text-muted-foreground"
        >
          {show ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      {error && (
        <p id="password-error" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
