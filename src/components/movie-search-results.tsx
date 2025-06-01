import { Pagination } from "@/components/pagination";
import { MovieCard } from "@/components/movie-card";
import { fetchMovies } from "@/lib/api";
import { MovieDetails } from "@/lib/types";

interface MovieSearchResultsProps {
  query: string;
  genre: string;
  sortBy: string;
  rating: number;
  page: number;
}

export async function MovieSearchResults({
  query,
  genre,
  sortBy,
  rating,
  page,
}: MovieSearchResultsProps) {
  const data = await fetchMovies({
    page,
    query_term: query,
    genre: genre === "All Genres" ? "" : genre,
    sort_by: sortBy,
    minimum_rating: rating,
    limit: 20,
  });

  const movies: MovieDetails[] = data.movies || [];
  const totalPages = data ? Math.ceil(data.movie_count / 20) : 0;

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-4">
          No movies found
        </h2>
        <p className="text-gray-400">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {movies.length} of {data?.movie_count || 0} movies
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="py-8">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
