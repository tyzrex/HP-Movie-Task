import Image from "next/image";
import { Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorite-button";
import type { MovieDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  movie: MovieDetails | null;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) {
    return (
      <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gray-800 animate-pulse" />
    );
  }

  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={
            movie.large_cover_image || "/placeholder.svg?height=400&width=800"
          }
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 h-full flex items-center px-4 sm:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="block">{movie.title.toUpperCase()}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Badge className="bg-yellow-600 text-black font-semibold">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {movie.rating}
            </Badge>
            <Badge variant="outline" className="border-gray-400 text-gray-300">
              {movie.language || "English"}
            </Badge>
            {movie.year && (
              <Badge
                variant="outline"
                className="border-gray-400 text-gray-300"
              >
                {movie.year}
              </Badge>
            )}
          </div>

          <p className="text-gray-300 mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
            {movie.description_full || movie.summary}
          </p>

          <div className="flex items-center space-x-4">
            <Button className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium">
              <Play className="w-4 h-4 mr-2 fill-current" />
              Watch
            </Button>
            <FavoriteButton movieId={movie.id} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
