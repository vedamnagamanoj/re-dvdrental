"use client";

import { useQuery } from "@tanstack/react-query";

type Film = {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rental_rate: string;
};

export default function HomePage() {
  const { data: films, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: async () => {
      const res = await fetch("/api/films");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading films...</p>
      </div>
    );

  return (
    <main>
      <h2 className="text-2xl font-semibold mb-4">Top 20 Films</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {films?.map((film: Film) => (
          <div
            key={`${film.film_id}`}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg mb-1">{film.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{film.description}</p>
            <p className="text-sm text-gray-500">
              {`Year: ${film.release_year ?? "N/A"} | Rate: $${
                film.rental_rate
              }`}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
