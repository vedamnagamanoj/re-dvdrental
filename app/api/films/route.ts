import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const films = await prisma.film.findMany({
    take: 20,
    select: {
      film_id: true,
      title: true,
      description: true,
      release_year: true,
      rental_rate: true,
    },
  });
  return NextResponse.json(films);
}
