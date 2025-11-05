"use client";

import { useQuery } from "@tanstack/react-query";

type Customer = {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: number;
};

export default function CustomersList() {
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-gray-500">Loading customers...</p>;

  return (
    <main>
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c: Customer) => (
              <tr
                key={`${c.customer_id}`}
                className="border-t hover:bg-blue-50"
              >
                <td className="p-2">{`${c.customer_id}`}</td>
                <td className="p-2">
                  {c.first_name} {c.last_name}
                </td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.active ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
