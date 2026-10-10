import { Silkscreen, Pixelify_Sans, Cairo, Inter, Caveat } from 'next/font/google'
import './globals.css'
const px = Silkscreen({ weight: ['400', '700'], subsets: ['latin'], variable: '--px' })
const sans = Pixelify_Sans({ subsets: ['latin'], variable: '--sg' })
const ui = Inter({ subsets: ['latin'], variable: '--ui' })
const hand = Caveat({ subsets: ['latin'], variable: '--hand' })
const ar = Cairo({ subsets: ['arabic', 'latin'], variable: '--ar' })

// Favicon : petit cœur pixel (SVG intégré, aucun fichier à ajouter)
const heart = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 8' shape-rendering='crispEdges'><path fill='#a259ff' d='M1 0h2v1H1zM6 0h2v1H6zM0 1h4v1H0zM5 1h4v1H5zM0 2h9v2H0zM1 4h7v1H1zM2 5h5v1H2zM3 6h3v1H3zM4 7h1v1H4z'/></svg>"

export const metadata = {
  title: 'Maryem Ben Garfa — Software Engineer | Full-Stack & E-commerce Developer',
  description: 'Portfolio de Maryem Ben Garfa : développement full-stack, WordPress et e-commerce.',
  icons: { icon: 'data:image/svg+xml,' + encodeURIComponent(heart) },
}
export default function RootLayout({ children }) {
  return <html lang="fr" data-theme="dark"><body className={`${px.variable} ${sans.variable} ${ui.variable} ${hand.variable} ${ar.variable}`}>{children}</body></html>
}