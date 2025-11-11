"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { fundCreateSchema } from "./schema";

export const createFund = authActionClient
  .metadata({ actionName: "createFund" })
  .inputSchema(fundCreateSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    // check for possible existing fund name
    // to avoid duplicates
    const existingFund = await prisma.fund.findFirst({
      where: {
        userId: user.id,
        name: {
          equals: parsedInput.name,
          mode: "insensitive",
        },
      },
    });

    if (existingFund) throw new Error(`Cannot have funds with the same name.`);

    const fund = await prisma.fund.create({
      data: {
        type: parsedInput.type,
        name: parsedInput.name,
        icon: parsedInput.icon,
        balance: parsedInput.balance,
        userId: user.id,
      },
    });

    revalidatePath("/funds");

    return {
      fund: {
        ...fund,
        balance: fund.balance.toNumber(),
      },
    };
  });
