"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "@/lib/favorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  movieId: number;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({ movieId, size = "sm" }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movieId));
  }, [movieId]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      if (favorite) {
        removeFromFavorites(movieId);
        setFavorite(false);
      } else {
        addToFavorites(movieId);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn(
        sizeClasses[size],
        "bg-black/30 hover:bg-black/50 text-white border border-zinc-700/20"
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          favorite ? "fill-red-600 text-red-600" : "text-white"
        )}
      />
    </Button>
  );
}
