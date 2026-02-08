'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="card p-4 flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-anime-dark rounded-lg overflow-hidden flex-shrink-0">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{item.category}</p>
          <p className="text-anime-primary font-bold text-lg">
            ${item.price?.toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 bg-anime-dark rounded-lg hover:bg-anime-secondary transition-colors flex items-center justify-center"
            >
              -
            </button>
            <span className="text-lg font-semibold w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 bg-anime-dark rounded-lg hover:bg-anime-secondary transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-anime-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-500 transition-colors ml-4"
            title="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

