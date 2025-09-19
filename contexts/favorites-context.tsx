"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (item: FavoriteItem) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("restaurant-favorites")
    if (savedFavorites) {
      try {
        const favoriteItems = JSON.parse(savedFavorites)
        setFavorites(favoriteItems)
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("restaurant-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id)
    } else {
      addToFavorites(item)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
