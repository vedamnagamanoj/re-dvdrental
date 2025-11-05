"use client";

import { useQuery } from "@tanstack/react-query";

type Rental = {
  rental_id: number;
  rental_date: Date;
  return_date: Date;
  inventory_id: number;
  customer_id: number;
};

export default function RentalsList() {
  const { data: rentals, isLoading } = useQuery({
    queryKey: ["rentals"],
    queryFn: async () => {
      const res = await fetch("/api/rentals");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-gray-500">Loading rentals...</p>;

  return (
    <main>
      <h2 className="text-2xl font-semibold mb-4">Rentals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Rental Date</th>
              <th className="p-2">Return Date</th>
              <th className="p-2">Customer ID</th>
              <th className="p-2">Inventory ID</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r: Rental) => (
              <tr key={`${r.rental_id}`} className="border-t hover:bg-green-50">
                <td className="p-2">{`${r.rental_id}`}</td>
                <td className="p-2">
                  {new Date(r.rental_date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {r.return_date
                    ? new Date(r.return_date).toLocaleDateString()
                    : "Not returned"}
                </td>
                <td className="p-2">{`${r.customer_id}`}</td>
                <td className="p-2">{`${r.inventory_id}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
