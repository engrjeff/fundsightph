import { HardDriveIcon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FundFormDialog } from "@/features/funds/fund-form";
import { FundList } from "@/features/funds/fund-list";
import { getFunds } from "@/features/funds/queries";
import { getSession } from "@/lib/get-session";

export const metadata: Metadata = {
  title: "Funds",
};

export default async function FundsPage() {
  const session = await getSession();

  if (!session?.user) redirect("/sign-in");

  const funds = await getFunds();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-semibold">Funds</h1>
          <p className="text-muted-foreground text-sm">
            View and manage your sources of funds
          </p>
        </div>
        <div className="ml-auto">
          <FundFormDialog />
        </div>
      </div>
      {funds.length === 0 ? (
        <Empty className="h-full border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HardDriveIcon />
            </EmptyMedia>
            <EmptyTitle>No Funds Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t added any funds yet. Get started by creating your
              first fund.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <FundFormDialog />
          </EmptyContent>
        </Empty>
      ) : (
        <FundList funds={funds} />
      )}
    </div>
  );
}
