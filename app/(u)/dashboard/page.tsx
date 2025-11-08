import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboadPage() {
  const session = await getSession();

  if (!session?.user) redirect("/sign-in");

  return <div>Dashboard Page</div>;
}
