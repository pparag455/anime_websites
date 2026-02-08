'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/supabase'
import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (email, password) => {
    try {
      setLoading(true)
      setError('')
      const { data, error: signUpError } = await signUp(email, password)
      
      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data?.user) {
        setSuccess(true)
        // Auto-login after signup and redirect to profile
        setTimeout(() => {
          router.push('/profile')
          router.refresh()
        }, 1500)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create <span className="text-anime-primary">Account</span>
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Sign up to start shopping for anime posters
          </p>

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
              Account created successfully! Redirecting to login...
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <AuthForm
            onSubmit={handleSignup}
            loading={loading}
            submitText="Sign Up"
          />

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-anime-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


