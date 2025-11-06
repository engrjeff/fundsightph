import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-muted p-6 md:p-10">
      <SignUp />
    </div>
  );
}
