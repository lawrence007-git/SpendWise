"use client";

import { AuthForm } from "../../_components/AuthForm";
import { SignUpDetailsForm } from "./SignUpDetailsForm";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { useSignUpFlow } from "./SignUpFlow";

export function SignUpForm() {
  const {
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
  } = useSignUpFlow();

  if (isSignedIn) return null;

  return (
    <AuthForm mode="signup" notice={notice} onGoogleClick={() => {}}>
      {verifying ? (
        <VerifyEmailForm
          userEmail={userEmail}
          code={code}
          onCodeChange={setCode}
          onVerify={handleVerify}
          onResendCode={handleResendCode}
          onStartOver={handleStartOver}
        />
      ) : (
        <SignUpDetailsForm
          errors={errors}
          onSubmit={handleRegister}
          onBackToHome={handleBackToHome}
        />
      )}
    </AuthForm>
  );
}
