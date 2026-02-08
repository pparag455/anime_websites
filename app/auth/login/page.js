'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import AuthForm from '@/components/AuthForm'
import Link from 'next/link'
import Loader from '@/components/Loader'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      const redirect = searchParams.get('redirect') || '/profile'
      router.push(redirect)
    }
  }, [user, authLoading, router, searchParams])

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      setError('')
      const { data, error: signInError } = await signIn(email, password)
      
      if (signInError) {
        setError(signInError.message)
        return
      }

      if (data?.user) {
        // Successfully logged in - redirect to profile or requested page
        const redirect = searchParams.get('redirect') || '/profile'
        // Small delay to ensure auth state updates
        setTimeout(() => {
          router.push(redirect)
          router.refresh()
        }, 100)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome <span className="text-anime-primary">Back</span>
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Sign in to your account to continue shopping
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <AuthForm
            onSubmit={handleLogin}
            loading={loading}
            submitText="Sign In"
          />

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-anime-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


