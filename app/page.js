import Link from 'next/link'
import { getFeaturedPosters } from '@/lib/anime-api'
import PosterCard from '@/components/PosterCard'

export default async function Home() {
  // Fetch featured posters from anime API
  const featuredPosters = await getFeaturedPosters()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-anime-primary via-anime-secondary to-anime-accent opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-anime-primary via-anime-secondary to-anime-accent bg-clip-text text-transparent animate-fade-in">
            Anime Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-up">
            Premium Anime Posters Collection
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="btn-primary text-lg px-8 py-3">
              Shop Now
            </Link>
            <Link href="/shop" className="btn-secondary text-lg px-8 py-3">
              Browse Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posters Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured <span className="text-anime-primary">Posters</span>
          </h2>
          {featuredPosters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosters.map((poster) => (
                <PosterCard key={poster.id} poster={poster} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No posters available yet. Check back soon!</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary text-lg px-8 py-3">
              View All Posters
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-anime-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-400">Quick and secure delivery worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-400">High-resolution prints on quality paper</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-400">Safe and encrypted transactions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


