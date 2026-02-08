import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Make Supabase optional - only needed for auth and orders
let supabase = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co') {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase not configured - auth and orders will not work. Anime data will still load from external API.')
}

// Export supabase client (can be null)
export { supabase }

// Auth helpers
export const signUp = async (email, password) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } }
  }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    return null
  }
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers - Now using external anime API
// These functions are kept for backward compatibility but use anime API instead
export const getPosters = async () => {
  // Use anime API instead of Supabase
  const { getAllPosters } = await import('./anime-api')
  const posters = await getAllPosters()
  return { data: posters, error: null }
}

export const getPosterById = async (id) => {
  // Use anime API instead of Supabase
  const { getPosterById: getAnimePoster } = await import('./anime-api')
  const poster = await getAnimePoster(id)
  return { data: poster, error: poster ? null : { message: 'Poster not found' } }
}

export const getPostersByCategory = async (category) => {
  // Use anime API instead of Supabase
  const { getAnimeByCategory, animeToPoster } = await import('./anime-api')
  const animeList = await getAnimeByCategory(category)
  const posters = animeList.map((anime, index) => animeToPoster(anime, index))
  return { data: posters, error: null }
}

export const createOrder = async (orderData) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single()
  return { data, error }
}

export const getUserOrders = async (userId) => {
  if (!supabase) {
    return { data: [], error: null }
  }
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}


