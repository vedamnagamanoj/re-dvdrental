import CustomersList from "@/components/CustomersList";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return <CustomersList />;
}
