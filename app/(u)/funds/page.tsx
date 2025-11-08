import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Funds",
};

export default async function FundsPage() {
  const session = await getSession();

  if (!session?.user) redirect("/sign-in");

  return <div>Funds</div>;
}
