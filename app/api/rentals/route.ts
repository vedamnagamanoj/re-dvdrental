import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rentals = await prisma.rental.findMany({
    take: 20,
    select: {
      rental_id: true,
      rental_date: true,
      return_date: true,
      inventory_id: true,
      customer_id: true,
    },
  });
  return NextResponse.json(rentals);
}
