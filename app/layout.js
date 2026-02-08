import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Anime Hub - Premium Anime Posters',
  description: 'Shop the best collection of anime posters from your favorite series',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-anime-darker text-white min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


