'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getPosterById } from '@/lib/anime-api'
import { useCart } from '@/context/CartContext'
import Loader from '@/components/Loader'

export default function PosterDetailsPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [poster, setPoster] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    loadPoster()
  }, [params.id])

  const loadPoster = async () => {
    try {
      setLoading(true)
      const posterData = await getPosterById(params.id)
      setPoster(posterData)
    } catch (error) {
      console.error('Error loading poster:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (poster) {
      addToCart(poster, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (!poster) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Poster not found</h2>
          <a href="/shop" className="btn-primary">
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="card p-4">
            {poster.image_url ? (
              <Image
                src={poster.image_url}
                alt={poster.title}
                width={600}
                height={800}
                className="w-full h-auto rounded-lg"
                unoptimized
              />
            ) : (
              <div className="w-full h-[600px] bg-anime-dark flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="text-anime-primary font-semibold">{poster.category}</span>
              <h1 className="text-4xl font-bold mt-2 mb-4">{poster.title}</h1>
              <p className="text-3xl font-bold text-anime-primary mb-6">
                ${poster.price?.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {poster.description || 'Premium quality anime poster featuring your favorite characters. Perfect for decorating your room, office, or any space that needs a touch of anime magic.'}
              </p>
              {poster.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">Rating:</span>
                  <span className="text-anime-primary font-semibold">⭐ {poster.rating}/10</span>
                </div>
              )}
              {poster.episodes && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Episodes:</span>
                  <span className="text-gray-300">{poster.episodes}</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-anime-dark rounded-lg hover:bg-anime-secondary transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-anime-dark rounded-lg hover:bg-anime-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full btn-primary text-lg py-4 ${
                addedToCart ? 'bg-green-600 hover:bg-green-600' : ''
              }`}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-700">
              <div className="space-y-2 text-sm text-gray-400">
                <p>✓ Premium Quality Print</p>
                <p>✓ Fast Shipping Available</p>
                <p>✓ Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

