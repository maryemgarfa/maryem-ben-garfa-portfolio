'use client'
import { useEffect, useRef } from 'react'
import { asset } from '../lib/data'

// Étoiles : positions fixes (en %), uniquement dans le ciel libre de l'illustration
const rnd = (i, n) => { const x = Math.sin(i * 97.13 + n * 12.9898) * 43758.5453; return x - Math.floor(x) }
const STARS = Array.from({ length: 70 }, (_, i) => ({ x: rnd(i, 1) * 98 + 1, y: rnd(i, 2) * 100, s: rnd(i, 3) < .3 ? 3 : 2, d: rnd(i, 4) * 5, t: 2 + rnd(i, 5) * 3 }))
  .filter(s => (s.y < 22 && !(s.x > 74 && s.y > 0)) || (s.x < 8 && s.y < 70) || (s.x > 8 && s.x < 22 && s.y < 30))
  .slice(0, 26)

// Lueurs qui pulsent sur l'illustration (position en %, taille en % de la largeur)
const GLOWS = [
  { x: 32.3, y: 42.9, w: 9, c: '#ffb454', t: 2.6, d: 0 },    // lanterne du bureau
  { x: 9.3, y: 40, w: 8, c: '#ffb454', t: 3.2, d: .8 },      // lanterne de la petite île
  { x: 54.2, y: 56.3, w: 9, c: '#d66bff', t: 3, d: .4 },     // cœur de l'ordinateur
  { x: 91, y: 12.9, w: 12, c: '#fff1b8', t: 4.2, d: 1.2 },   // lune
  { x: 76.5, y: 12, w: 6, c: '#ffb454', t: 3.4, d: .2 },     // fenêtre du château
  { x: 89, y: 48.6, w: 8, c: '#6ad2ff', t: 2.8, d: 1.6 },    // tour bleue
]

export default function HeroArt() {
  const ref = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current; let raf = 0
    const move = e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg')
        el.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg')
        el.style.setProperty('--px', (-x * 14).toFixed(1) + 'px')
        el.style.setProperty('--py', (-y * 8).toFixed(1) + 'px')
      })
    }
    addEventListener('pointermove', move, { passive: true })
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="scene" aria-hidden="true">
      <div className="art" ref={ref}>
        <div className="art-float">
          <img src={asset('/art/hero.png')} alt="" />
          <div className="fx stars">{STARS.map((s, i) => (
            <i key={i} className="star" style={{ left: s.x + '%', top: s.y + '%', '--s': s.s + 'px', '--t': s.t + 's', '--d': s.d + 's' }} />))}</div>
          {GLOWS.map((g, i) => (
            <i key={i} className="fx glow" style={{ left: g.x + '%', top: g.y + '%', width: g.w + '%', '--c': g.c, '--t': g.t + 's', '--d': g.d + 's' }} />))}
          <i className="fx fall" />
        </div>
      </div>
    </div>)
}