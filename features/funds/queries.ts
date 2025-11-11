"use server";

import { getSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function getFunds() {
  try {
    const session = await getSession();

    if (!session?.user) throw new Error("Unauthorized");

    const funds = await prisma.fund.findMany({
      where: { userId: session.user.id },
    });

    return funds;
  } catch (error) {
    console.log("Get Funds Error: ", error);
    return [];
  }
}
