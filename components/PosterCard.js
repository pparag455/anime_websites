import Link from 'next/link'
import Image from 'next/image'

export default function PosterCard({ poster }) {
  return (
    <Link href={`/poster/${poster.id}`}>
      <div className="card cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-80 bg-anime-dark overflow-hidden">
          {poster.image_url ? (
            <Image
              src={poster.image_url}
              alt={poster.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-sm text-anime-primary font-semibold mb-1">
            {poster.category}
          </span>
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{poster.title}</h3>
          <p className="text-anime-primary text-xl font-bold mt-auto">
            ${poster.price?.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}

