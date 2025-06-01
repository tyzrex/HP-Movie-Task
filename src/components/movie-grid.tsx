import Link from "next/link";
import { MovieCard } from "@/components/movie-card";
import type { Movie } from "@/lib/types";

interface MovieGridProps {
  title: string;
  movies: Movie[];
}

export function MovieGrid({ title, movies }: MovieGridProps) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
        </div>
        <Link
          href="/movies"
          className="text-sm text-red-600 hover:text-red-500"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
