"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";
import { getFavorites } from "@/lib/favorites";
import { fetchMovieDetails } from "@/lib/api";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import type { Movie } from "@/lib/types";

export default function FavoritesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();

    const handleFavoritesChange = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    return () =>
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoriteIds = getFavorites();

      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      // Fetch details for each favorite movie
      const moviePromises = favoriteIds.map((id) =>
        fetchMovieDetails(id).catch(() => null)
      );
      const movies = await Promise.all(moviePromises);
      setFavoriteMovies(movies.filter(Boolean) as Movie[]);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavoriteMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFavorites = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cinevault_favorites");
      setFavoriteMovies([]);
      window.dispatchEvent(new CustomEvent("favoritesChanged"));
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-700 rounded w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-zinc-700 rounded-lg shimmer"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="mr-4 text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-600 fill-current" />
            My Favorites
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">
            {favoriteMovies.length} movie
            {favoriteMovies.length !== 1 ? "s" : ""}
          </span>
          {favoriteMovies.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFavorites}
              className="border-red-600/30 text-red-600 hover:bg-red-600/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {favoriteMovies.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-20 h-20 text-zinc-600 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Your favorites list is empty
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Start adding movies to your favorites to keep track of what you want
            to watch
          </p>
          <Link href="/movies">
            <Button className="bg-red-600 hover:bg-red-700">
              Browse Movies
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
