import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import { MovieGrid } from "@/components/movie-grid";
import type { MovieDetails as MovieDetailsType, Movie } from "@/lib/types";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  similarMovies: Movie[];
}

export function MovieDetails({ movie, similarMovies }: MovieDetailsProps) {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-[65vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              movie.large_cover_image ||
              "/placeholder.svg?height=1080&width=1920"
            }
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
            <Link href="/" className="inline-block mb-6">
              <Button variant="ghost" className="text-white hover:bg-black/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative aspect-[2/3] max-w-xs mx-auto md:mx-0">
                  <Image
                    src={
                      movie.large_cover_image ||
                      "/placeholder.svg?height=600&width=400"
                    }
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-2 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {movie.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center text-white">
                    <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                    <span className="text-xl font-semibold">
                      {movie.rating}/10
                    </span>
                  </div>
                  <div className="flex items-center text-zinc-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {movie.year}
                  </div>
                  {movie.runtime && (
                    <div className="flex items-center text-zinc-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {movie.runtime} min
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre}
                        className="bg-red-600/20 text-white border-red-600/30"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-zinc-300 leading-relaxed max-w-3xl">
                  {movie.description_full || movie.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <FavoriteButton movieId={movie.id} size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              About the Movie
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-8">
              {movie.description_full || movie.summary}
            </p>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.cast.slice(0, 8).map((actor, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-zinc-700 rounded-full flex items-center justify-center">
                        {actor.url_small_image ? (
                          <Image
                            src={actor.url_small_image || "/placeholder.svg"}
                            alt={actor.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-zinc-400 text-xs">
                            {actor.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-white text-sm">
                        {actor.name}
                      </h4>
                      <p className="text-zinc-400 text-xs">
                        {actor.character_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Movie Info
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-zinc-700">
                  <span className="text-zinc-400">Release Year</span>
                  <span className="text-white">{movie.year}</span>
                </div>
                {movie.runtime && (
                  <div className="flex justify-between py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Runtime</span>
                    <span className="text-white">{movie.runtime} minutes</span>
                  </div>
                )}
                {movie.language && (
                  <div className="flex justify-between py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Language</span>
                    <span className="text-white">{movie.language}</span>
                  </div>
                )}
                {movie.mpa_rating && (
                  <div className="flex justify-between py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Rating</span>
                    <span className="text-white">{movie.mpa_rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies && similarMovies.length > 0 && (
        <MovieGrid title="Similar Movies" movies={similarMovies.slice(0, 12)} />
      )}
    </div>
  );
}
