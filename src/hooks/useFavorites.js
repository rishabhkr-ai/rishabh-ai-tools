import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'ai-tools-hub:favorites'

function readStoredFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Favorites are stored as an array of tool ids in localStorage so the
// feature works fully client-side, with no backend or account required.
export function useFavorites() {
  const [favorites, setFavorites] = useState(readStoredFavorites)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage may be unavailable (private browsing, quota) — fail silently
    }
  }, [favorites])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f !== id))
  }, [])

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
