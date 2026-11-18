"use client";

import { AuthForm } from "../../_components/AuthForm";
import { SignInFieldsForm } from "./SignInFieldForm";
import { useSignInFlow } from "./SignInFlow";

export function SignInForm() {
  const {
    isSignedIn,
    isSubmitting,
    errors,
    notice,
    handleSignIn,
    handleGoogleSignIn,
  } = useSignInFlow();

  if (isSignedIn) return null;

  return (
    <AuthForm mode="signin" notice={notice} onGoogleClick={handleGoogleSignIn}>
      <SignInFieldsForm
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSignIn}
      />
    </AuthForm>
  );
}
