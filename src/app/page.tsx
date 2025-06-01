import { HeroSection } from "@/components/hero-section";
import { MovieGrid } from "@/components/movie-grid";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { MovieGridSkeleton } from "@/components/skeletons/movie-grid-skeleton";
import { fetchFeaturedMovie, fetchMoviesByGenres } from "@/lib/api";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSectionWrapper />
      </Suspense>
      <Suspense fallback={<MovieGridSkeleton title="Popular Movies" />}>
        <PopularMoviesWrapper />
      </Suspense>
      <Suspense fallback={<MovieGridSkeleton title="Top Rated" />}>
        <TopRatedMoviesWrapper />
      </Suspense>
    </>
  );
}

async function HeroSectionWrapper() {
  const featuredMovie = await fetchFeaturedMovie();
  return <HeroSection movie={featuredMovie} />;
}

async function PopularMoviesWrapper() {
  const moviesByGenres = await fetchMoviesByGenres();
  const popularMovies =
    moviesByGenres.find((g) => g.genre === "Action")?.movies.slice(0, 8) || [];
  return <MovieGrid title="Popular Movies" movies={popularMovies} />;
}

async function TopRatedMoviesWrapper() {
  const moviesByGenres = await fetchMoviesByGenres();
  const topRatedMovies =
    moviesByGenres.find((g) => g.genre === "Drama")?.movies.slice(0, 8) || [];
  return <MovieGrid title="Top Rated" movies={topRatedMovies} />;
}
