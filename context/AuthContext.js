'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, supabase } from '@/lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial check
    checkUser()

    // Listen to auth state changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
          }
          setLoading(false)
        }
      )

      return () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      }
    } else {
      setLoading(false)
    }
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error checking user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, checkUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

