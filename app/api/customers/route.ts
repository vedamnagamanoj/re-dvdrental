import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    take: 20,
    select: {
      customer_id: true,
      first_name: true,
      last_name: true,
      email: true,
      active: true,
    },
  });
  return NextResponse.json(customers);
}
