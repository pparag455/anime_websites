'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, getUserOrders } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/Loader'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/profile')
        return
      }
      loadOrders()
    }
  }, [user, authLoading, router])

  const loadOrders = async () => {
    if (!user) return
    
    try {
      setLoadingOrders(true)
      const { data: userOrders } = await getUserOrders(user.id)
      setOrders(userOrders || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (authLoading || loadingOrders) {
    return <Loader />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          My <span className="text-anime-primary">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-lg font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">User ID</label>
                  <p className="text-sm text-gray-400 font-mono">{user.id}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary mt-4"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Order History */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">Order History</h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-anime-dark p-4 rounded-lg border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-anime-primary font-bold">
                          ${order.total?.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        Status: {order.status || 'Completed'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No orders yet. Start shopping to see your orders here!</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/shop" className="block btn-primary text-center">
                  Browse Shop
                </a>
                <a href="/cart" className="block btn-secondary text-center">
                  View Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


