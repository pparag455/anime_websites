/**
 * Anime API Service using Jikan API (MyAnimeList)
 * Free API, no authentication required
 * Documentation: https://docs.api.jikan.moe/
 */

// Map our categories to anime search terms
const categoryMap = {
  'Naruto': 'Naruto',
  'One Piece': 'One Piece',
  'Attack on Titan': 'Shingeki no Kyojin',
  'Dragon Ball': 'Dragon Ball',
  'Demon Slayer': 'Kimetsu no Yaiba',
  'My Hero Academia': 'Boku no Hero Academia',
  'Jujutsu Kaisen': 'Jujutsu Kaisen',
}

// Popular anime IDs for featured content
const featuredAnimeIds = [
  20,   // Naruto
  21,   // One Piece
  16498, // Attack on Titan
  813,   // Dragon Ball Z
  38000, // Demon Slayer
  31964, // My Hero Academia
  40748, // Jujutsu Kaisen
  1535,  // Death Note
  11757, // Sword Art Online
  11061, // Hunter x Hunter
  30276, // One Punch Man
  17074, // JoJo's Bizarre Adventure
]

/**
 * Fetch anime by ID from Jikan API
 */
export async function getAnimeById(id) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (!response.ok) throw new Error('Failed to fetch anime')
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching anime:', error)
    return null
  }
}

/**
 * Search anime by query
 */
export async function searchAnime(query, limit = 10) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=${limit}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )
    if (!response.ok) throw new Error('Failed to search anime')
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error searching anime:', error)
    return []
  }
}

/**
 * Get top/popular anime
 */
export async function getTopAnime(limit = 20) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?limit=${limit}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )
    if (!response.ok) throw new Error('Failed to fetch top anime')
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching top anime:', error)
    return []
  }
}

/**
 * Get anime by category (maps to our shop categories)
 */
export async function getAnimeByCategory(category) {
  if (category === 'All') {
    return getTopAnime(24)
  }

  const searchTerm = categoryMap[category] || category
  return searchAnime(searchTerm, 12)
}

/**
 * Convert anime data to poster format
 */
export function animeToPoster(anime, index = 0) {
  return {
    id: `anime-${anime.mal_id}`,
    title: anime.title || anime.title_english || 'Unknown Anime',
    description: anime.synopsis || 'No description available.',
    price: 24.99 + (index % 3) * 5, // Vary prices: $24.99, $29.99, $34.99
    category: getCategoryFromAnime(anime),
    image_url: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || null,
    mal_id: anime.mal_id,
    rating: anime.score,
    episodes: anime.episodes,
  }
}

/**
 * Get category from anime data (try to match to our categories)
 */
function getCategoryFromAnime(anime) {
  const title = (anime.title || '').toLowerCase()
  const titleEnglish = (anime.title_english || '').toLowerCase()
  
  if (title.includes('naruto') || titleEnglish.includes('naruto')) return 'Naruto'
  if (title.includes('one piece') || titleEnglish.includes('one piece')) return 'One Piece'
  if (title.includes('shingeki') || title.includes('attack on titan') || titleEnglish.includes('attack on titan')) return 'Attack on Titan'
  if (title.includes('dragon ball') || titleEnglish.includes('dragon ball')) return 'Dragon Ball'
  if (title.includes('kimetsu') || title.includes('demon slayer') || titleEnglish.includes('demon slayer')) return 'Demon Slayer'
  if (title.includes('boku no hero') || title.includes('my hero') || titleEnglish.includes('my hero')) return 'My Hero Academia'
  if (title.includes('jujutsu') || titleEnglish.includes('jujutsu')) return 'Jujutsu Kaisen'
  
  return 'Other'
}

/**
 * Get featured posters (for home page)
 */
export async function getFeaturedPosters() {
  try {
    const animeList = await Promise.all(
      featuredAnimeIds.slice(0, 6).map(id => getAnimeById(id))
    )
    
    return animeList
      .filter(anime => anime !== null)
      .map((anime, index) => animeToPoster(anime, index))
  } catch (error) {
    console.error('Error fetching featured posters:', error)
    return []
  }
}

/**
 * Get all posters (for shop page)
 */
export async function getAllPosters() {
  try {
    const topAnime = await getTopAnime(24)
    return topAnime.map((anime, index) => animeToPoster(anime, index))
  } catch (error) {
    console.error('Error fetching all posters:', error)
    return []
  }
}

/**
 * Get poster by ID (for detail page)
 */
export async function getPosterById(id) {
  try {
    // Extract mal_id from our ID format (anime-12345)
    const malId = id.replace('anime-', '')
    const anime = await getAnimeById(malId)
    if (!anime) return null
    
    return animeToPoster(anime, 0)
  } catch (error) {
    console.error('Error fetching poster by ID:', error)
    return null
  }
}

