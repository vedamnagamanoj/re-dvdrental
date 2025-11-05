import { authOptions } from "@/app/api/auth/[...nextauth]";
import RentalsList from "@/components/RentalsList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return <RentalsList />;
}
