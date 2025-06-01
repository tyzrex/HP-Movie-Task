export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  summary: string;
  description_full?: string;
  medium_cover_image: string;
  large_cover_image?: string;
  small_cover_image?: string;
  runtime?: number;
}

export interface MovieDetails extends Movie {
  description_full: string;
  large_cover_image: string;
  runtime: number;
  cast?: Array<{
    name: string;
    character_name: string;
    url_small_image?: string;
    imdb_code?: string;
  }>;
  directors?: Array<{
    name: string;
    url_small_image?: string;
  }>;
  download_count?: number;
  like_count?: number;
  language?: string;
  mpa_rating?: string;
}

export interface MoviesByGenre {
  genre: string;
  movies: Movie[];
}

export type Genre = string;
