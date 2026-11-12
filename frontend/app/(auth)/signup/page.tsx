import { AuthLayout } from "../_components/AuthLayout";
import { SignUpForm } from "./_components/SignUpForm";

export default async function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
