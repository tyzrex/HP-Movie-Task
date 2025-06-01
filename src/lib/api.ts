const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://yts.mx/api/v2";

export interface FetchMoviesParams {
  page?: number;
  limit?: number;
  quality?: string;
  minimum_rating?: number;
  query_term?: string;
  genre?: string;
  sort_by?: string;
  order_by?: string;
}

export async function fetchMovies(params: FetchMoviesParams = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${BASE_URL}/list_movies.json?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie_details.json?movie_id=${movieId}&with_cast=true`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  return data.data.movie;
}

export async function fetchFeaturedMovie() {
  try {
    const data = await fetchMovies({
      sort_by: "rating",
      order_by: "desc",
      limit: 1,
      minimum_rating: 7,
    });

    return data.movies?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch featured movie:", error);
    return null;
  }
}

export async function fetchMoviesByGenres() {
  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

  const promises = genres.map(async (genre) => {
    try {
      const data = await fetchMovies({
        genre,
        limit: 20,
        sort_by: "rating",
        order_by: "desc",
        minimum_rating: 6,
      });
      return {
        genre,
        movies: data.movies || [],
      };
    } catch (error) {
      console.error(`Failed to fetch ${genre} movies:`, error);
      return {
        genre,
        movies: [],
      };
    }
  });

  const results = await Promise.all(promises);
  return results.filter((result) => result.movies.length > 0);
}

export async function fetchGenres() {
  return [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];
}

export async function fetchSimilarMovies(movieId: number) {
  try {
    // Get movie details first to find genres
    const movie = await fetchMovieDetails(movieId);
    const primaryGenre = movie.genres?.[0];

    if (!primaryGenre) {
      return [];
    }

    const data = await fetchMovies({
      genre: primaryGenre,
      limit: 20,
      sort_by: "rating",
      order_by: "desc",
      minimum_rating: 6,
    });

    // Filter out the current movie
    return data.movies?.filter((m: any) => m.id !== movieId) || [];
  } catch (error) {
    console.error("Failed to fetch similar movies:", error);
    return [];
  }
}
