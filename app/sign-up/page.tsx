import { redirect } from "next/navigation";
import { SignUpForm } from "@/features/auth/sign-up-form";
import { getSession } from "@/lib/get-session";

async function SignUpPage() {
  const session = await getSession();

  if (session?.user) redirect("/dashboard");

  return (
    <div className="container mx-auto max-w-xl p-6">
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
