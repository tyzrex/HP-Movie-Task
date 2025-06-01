export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const favorites = localStorage.getItem("cinevault_favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
}

export function addToFavorites(movieId: number): void {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavorites();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem("cinevault_favorites", JSON.stringify(favorites));

      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent("favoritesChanged"));
    }
  } catch (error) {
    console.error("Failed to add to favorites:", error);
  }
}

export function removeFromFavorites(movieId: number): void {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem(
      "cinevault_favorites",
      JSON.stringify(updatedFavorites)
    );

    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  } catch (error) {
    console.error("Failed to remove from favorites:", error);
  }
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().includes(movieId);
}
