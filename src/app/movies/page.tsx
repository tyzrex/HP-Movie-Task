import { Suspense } from "react";
import { fetchGenres } from "@/lib/api";
import { MovieSearchResults } from "@/components/movie-search-results";
import { SearchFilters } from "@/components/search-filters";
import { MovieGridSkeleton } from "@/components/skeletons/movie-grid-skeleton";

interface MoviesPageProps {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    sort?: string;
    rating?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const genres = await fetchGenres();

  const query = await searchParams;
  const search = query.search || "";
  const genre = query.genre || "";
  const sort = query.sort || "rating";
  const rating = Number(query.rating || "0");
  const page = Number(query.page || "1");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>

      <SearchFilters
        genres={genres}
        initialQuery={search}
        initialGenre={genre}
        initialSort={sort}
        initialRating={rating}
      />

      <Suspense
        key={`${search}-${genre}-${sort}-${rating}-${page}`}
        fallback={<MovieGridSkeleton title="Search Results" />}
      >
        <MovieSearchResults
          query={search}
          genre={genre}
          sortBy={sort}
          rating={rating}
          page={page}
        />
      </Suspense>
    </div>
  );
}
