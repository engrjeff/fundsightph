import { MinusIcon, PlusIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Image from "next/image";
import { type Fund, FundType } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function FundList({ funds }: { funds: Fund[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {funds.map((fund) => (
        <li key={fund.id}>
          <FundListItem fund={fund} />
        </li>
      ))}
    </ul>
  );
}

export function FundListItem({ fund }: { fund: Fund }) {
  return (
    <Card className="relative gap-4 py-3">
      <div className="flex items-start gap-3 px-3">
        {fund.type === FundType.CASH ? (
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <DynamicIcon
              name={fund.icon as IconName}
              className="size-5 text-current"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-md">
            <Image
              unoptimized
              src={fund.icon}
              alt={fund.name}
              width={32}
              height={32}
              className="size-8 rounded-md object-contain"
            />
          </div>
        )}
        <div>
          <CardTitle className="text-sm leading-tight">{fund.name}</CardTitle>
          <CardDescription className="text-xs capitalize">
            {fund.type.toLowerCase()}
          </CardDescription>
        </div>
        {/* <div className="absolute top-3 right-3 space-x-2">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="rounded-full bg-accent"
            aria-label="Edit fund"
          >
            <PenLineIcon />
          </Button>
        </div> */}
      </div>
      <CardContent className="px-3">
        <p className="font-semibold text-xl">
          {formatCurrency(fund.balance.toNumber())}
        </p>
        <p className="text-muted-foreground text-xs">Fund Value</p>
      </CardContent>
      <CardFooter className="gap-3 px-3">
        <Button size="sm" type="button" className="flex-1 rounded-full">
          View
        </Button>
        <Button
          size="icon"
          type="button"
          variant="ghost"
          className="rounded-full bg-accent"
          aria-label="Add transaction"
          title="Add transaction"
        >
          <PlusIcon />
        </Button>
        <Button
          size="icon"
          type="button"
          variant="ghost"
          className="rounded-full bg-accent"
          aria-label="Record deduction"
          title="Record deduction"
        >
          <MinusIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
