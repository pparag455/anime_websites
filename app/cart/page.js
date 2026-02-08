'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/CartItem'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login?redirect=/cart')
      return
    }
    // In a real app, you would integrate with a payment gateway here
    alert('Checkout functionality would be implemented here. For now, this is a demo.')
    // clearCart() // Uncomment after successful payment
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Shopping <span className="text-anime-primary">Cart</span>
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Start shopping to add items to your cart!</p>
            <Link href="/shop" className="btn-primary">
              Browse Posters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-anime-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary text-lg py-4 mb-4"
                >
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>
                <Link
                  href="/shop"
                  className="block w-full text-center btn-secondary py-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


