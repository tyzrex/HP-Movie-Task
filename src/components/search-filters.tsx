"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  genres: string[];
  onSearch?: (
    query: string,
    genre: string,
    sort: string,
    rating: number
  ) => void;
  initialQuery?: string;
  initialGenre?: string;
  initialSort?: string;
  initialRating?: number;
}

export function SearchFilters({
  genres,
  onSearch,
  initialQuery = "",
  initialGenre = "",
  initialSort = "rating",
  initialRating = 0,
}: SearchFiltersProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState(initialSort);
  const [minRating, setMinRating] = useState([initialRating]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
    setSelectedGenre(initialGenre);
    setSortBy(initialSort);
    setMinRating([initialRating]);
  }, [initialQuery, initialGenre, initialSort, initialRating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(query.trim(), selectedGenre, sortBy, minRating[0]);
    } else {
      // Build URL with search params
      const params = new URLSearchParams();

      if (query.trim()) params.set("search", query.trim());
      if (selectedGenre) params.set("genre", selectedGenre);
      if (sortBy !== "rating") params.set("sort", sortBy);
      if (minRating[0] > 0) params.set("rating", minRating[0].toString());

      router.push(`/movies?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedGenre("");
    setSortBy("rating");
    setMinRating([0]);

    if (onSearch) {
      onSearch("", "", "rating", 0);
    } else {
      router.push("/movies");
    }
  };

  const hasFilters =
    query.trim() || selectedGenre || sortBy !== "rating" || minRating[0] > 0;

  return (
    <div className="space-y-4 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:border-red-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "border-zinc-700 text-zinc-300 hover:bg-zinc-800",
              showFilters && "bg-zinc-800"
            )}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Search
          </Button>

          {hasFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-zinc-800 rounded-lg p-6 space-y-6 border border-zinc-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Genre
              </label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="bg-zinc-700 border-zinc-600 !text-white">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 border-zinc-600">
                  <SelectItem value="all" className="text-white">
                    All Genres
                  </SelectItem>
                  {genres.map((genre) => (
                    <SelectItem
                      className="text-white"
                      key={genre}
                      value={genre}
                    >
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 border-zinc-600">
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="download_count">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Minimum Rating: {minRating[0]}
              </label>
              <Slider
                value={minRating}
                onValueChange={setMinRating}
                max={9}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
