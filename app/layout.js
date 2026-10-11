import { Analytics } from '@vercel/analytics/next'
import { Silkscreen, Pixelify_Sans, Cairo, Inter, Caveat } from 'next/font/google'
import './globals.css'
const px = Silkscreen({ weight: ['400', '700'], subsets: ['latin'], variable: '--px' })
const sans = Pixelify_Sans({ subsets: ['latin'], variable: '--sg' })
const ui = Inter({ subsets: ['latin'], variable: '--ui' })
const hand = Caveat({ subsets: ['latin'], variable: '--hand' })
const ar = Cairo({ subsets: ['arabic', 'latin'], variable: '--ar' })

// Favicon : logo </> en pixels (SVG intégré, aucun fichier à ajouter)
const heart = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-1 0 19 8' shape-rendering='crispEdges'><path fill='#a259ff' d='M3 0h2v1h-2zM9 0h2v1h-2zM12 0h2v1h-2zM2 1h2v1h-2zM9 1h2v1h-2zM13 1h2v1h-2zM1 2h2v1h-2zM8 2h2v1h-2zM14 2h2v1h-2zM0 3h2v1h-2zM8 3h2v1h-2zM15 3h2v1h-2zM0 4h2v1h-2zM7 4h2v1h-2zM15 4h2v1h-2zM1 5h2v1h-2zM7 5h2v1h-2zM14 5h2v1h-2zM2 6h2v1h-2zM6 6h2v1h-2zM13 6h2v1h-2zM3 7h2v1h-2zM6 7h2v1h-2zM12 7h2v1h-2z'/></svg>"

export const metadata = {
  title: 'Maryem Ben Garfa — Software Engineer | Full-Stack & E-commerce Developer',
  description: 'Portfolio de Maryem Ben Garfa : développement full-stack, WordPress et e-commerce.',
  icons: { icon: 'data:image/svg+xml,' + encodeURIComponent(heart) },
}
export default function RootLayout({ children }) {
  return <html lang="fr" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-on')}catch(e){}" }} /></head><body className={`${px.variable} ${sans.variable} ${ui.variable} ${hand.variable} ${ar.variable}`}>{children}<Analytics /></body></html>
}