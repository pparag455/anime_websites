import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-anime-dark border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-anime-primary to-anime-accent bg-clip-text text-transparent">
              Anime Hub
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for premium anime posters and merchandise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-anime-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-anime-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-anime-primary transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/auth/login" className="hover:text-anime-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-anime-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-anime-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@animehub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Anime Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


