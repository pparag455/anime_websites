'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const router = useRouter()
  const { items } = useCart()
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Don't show navbar content while checking auth
  if (loading && !user) {
    return (
      <nav className="bg-anime-dark border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-anime-primary to-anime-accent bg-clip-text text-transparent">
                Anime Hub
              </span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-anime-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-anime-primary to-anime-accent bg-clip-text text-transparent">
              Anime Hub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-anime-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-300 hover:text-anime-primary transition-colors">
              Shop
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-gray-300 hover:text-anime-primary transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-anime-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="text-gray-300 hover:text-anime-primary transition-colors">
                Login
              </Link>
            )}
            <Link href="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-anime-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-anime-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-anime-primary">
              Home
            </Link>
            <Link href="/shop" className="block text-gray-300 hover:text-anime-primary">
              Shop
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block text-gray-300 hover:text-anime-primary">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-gray-300 hover:text-anime-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block text-gray-300 hover:text-anime-primary">
                Login
              </Link>
            )}
            <Link href="/cart" className="block text-gray-300 hover:text-anime-primary">
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}


