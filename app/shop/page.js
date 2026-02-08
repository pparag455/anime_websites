'use client'

import { useState, useEffect } from 'react'
import { getAllPosters, getAnimeByCategory, animeToPoster } from '@/lib/anime-api'
import PosterCard from '@/components/PosterCard'
import Loader from '@/components/Loader'

const categories = ['All', 'Naruto', 'One Piece', 'Attack on Titan', 'Dragon Ball', 'Demon Slayer', 'My Hero Academia', 'Jujutsu Kaisen']

export default function ShopPage() {
  const [posters, setPosters] = useState([])
  const [filteredPosters, setFilteredPosters] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosters()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosters(posters)
    } else {
      filterByCategory(selectedCategory)
    }
  }, [selectedCategory, posters])

  const loadPosters = async () => {
    try {
      setLoading(true)
      const allPosters = await getAllPosters()
      setPosters(allPosters)
      setFilteredPosters(allPosters)
    } catch (error) {
      console.error('Error loading posters:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterByCategory = async (category) => {
    try {
      setLoading(true)
      const animeList = await getAnimeByCategory(category)
      const categoryPosters = animeList.map((anime, index) => animeToPoster(anime, index))
      setFilteredPosters(categoryPosters)
    } catch (error) {
      console.error('Error filtering posters:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Shop <span className="text-anime-primary">Anime Posters</span>
        </h1>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-anime-primary text-white'
                    : 'bg-anime-dark text-gray-300 hover:bg-anime-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posters Grid */}
        {loading ? (
          <Loader />
        ) : filteredPosters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosters.map((poster) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No posters found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


