import { AuthLayout } from "../_components/AuthLayout";
import { SignInForm } from "./_components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
