import type { ReactNode } from "react";
import { getSession } from "@/lib/get-session";

export async function SignedOut({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (session?.user) return null;

  return <>{children}</>;
}
