"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorite-button";
import type { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative movie-card">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={
              imageError
                ? "/placeholder.svg?height=300&width=200"
                : movie.medium_cover_image
            }
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium">View Details</span>
          </div>
        </Link>

        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
              {movie.rating}
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute top-2 right-2">
          <FavoriteButton movieId={movie.id} size="sm" />
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-2">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-medium text-white text-sm truncate hover:text-red-500 transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center text-xs text-zinc-400">
          {movie.year}
          {movie.genres && movie.genres[0] && (
            <>
              <span className="mx-1">•</span>
              {movie.genres[0]}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
