import { redirect } from "next/navigation";
import { SignInForm } from "@/features/auth/sign-in-form";
import { getSession } from "@/lib/get-session";

async function SignInPage() {
  const session = await getSession();

  if (session?.user) redirect("/dashboard");

  return (
    <div className="container mx-auto max-w-xl p-6">
      <SignInForm />
    </div>
  );
}

export default SignInPage;
