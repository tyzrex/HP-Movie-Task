"use client";
import { navigationItems } from "@/constants/nav-item";
import { fetchMovieDetails } from "@/lib/api";
import { getFavorites } from "@/lib/favorites";
import { Movie } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useMedia from "use-media";

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 768px)");

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

  if (isMobile) {
    return null; // Mobile navigation is handled by MobileNav component
  }

  return (
    <div className="hidden md:flex w-64 bg-background border-r border-zinc-700 flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-white font-semibold">
            Cine<span className="text-red-600">Vault</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-red-600 font-bold text-white"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Favorites Section */}
        <div className="mt-8">
          <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-4">
            Recent Favorites
          </h3>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-700 w-full h-[100px] rounded-lg shimmer"
                  />
                ))}
              </div>
            </div>
          ) : favoriteMovies.length > 0 ? (
            <div className="grid gap-4">
              {favoriteMovies.slice(0, 6).map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="flex min-h-[100px] bg-zinc-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-2">
                    <h4 className="text-sm text-white line-clamp-2">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      {movie.year} • {movie.rating} ★
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-1 px-3 py-2 bg-zinc-700/50 rounded-lg">
              <p className="text-zinc-500 text-xs">
                Your recently favorited movies will appear here
              </p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
