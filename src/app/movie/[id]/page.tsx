import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MovieDetails } from "@/components/movie-details";
import { MovieDetailSkeleton } from "@/components/skeletons/movie-detail-skeleton";
import { fetchMovieDetails, fetchSimilarMovies } from "@/lib/api";

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
  try {
    const movieId = await params;
    if (!movieId || isNaN(Number(movieId.id))) {
      return {
        title: "Movie Not Found - CineVault",
      };
    }
    const movie = await fetchMovieDetails(Number(movieId.id));
    return {
      title: `${movie.title} (${movie.year}) - CineVault`,
      description: movie.description_full || movie.summary,
    };
  } catch {
    return {
      title: "Movie Not Found - CineVault",
    };
  }
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movieId = await params;

  return (
    <Suspense fallback={<MovieDetailSkeleton />}>
      <MovieDetailsWrapper id={movieId.id} />
    </Suspense>
  );
}

async function MovieDetailsWrapper({ id }: { id: string }) {
  try {
    const movie = await fetchMovieDetails(Number(id));
    const similarMovies = await fetchSimilarMovies(movie.id);

    return <MovieDetails movie={movie} similarMovies={similarMovies} />;
  } catch {
    notFound();
  }
}
