'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { PAL, DARK, rnd, pick, Vox, pix, island, tree, lantern, mushroom, HEART5, Part, Rig, buildMoon, buildCloud, buildCloudPink } from './Scene'

/* ------------------------------------------------------------------ *
 *  Petites îles flottantes en voxels (remplacent les anciennes images
 *  statiques) : plant | laptop | thanks | castle
 * ------------------------------------------------------------------ */

const flower = (v, p, x, z, n) => v.b(x, 0.12, z, 0.2, 0.24, 0.2, pick(p.flowers, n))
const bush = (v, p, x, z, s = 1) => {
  v.b(x, 0.45 * s, z, 1.0 * s, 0.9 * s, 1.0 * s, p.leaf[0])
  v.b(x + 0.15 * s, 0.95 * s, z - 0.1 * s, 0.6 * s, 0.5 * s, 0.6 * s, p.leaf[2])
}
const pot = (v, p, x, z, c = '#c46a4a') => {
  v.b(x, 0.35, z, 0.9, 0.7, 0.9, c)
  v.b(x, 0.75, z, 1.05, 0.15, 1.05, c)
}

// Île avec une grande plante en pot
function buildPlant(v, p) {
  island(v, p, { half: 3, depth: 4, seed: 11 })
  v.b(0, 0.7, 0, 1.8, 1.4, 1.8, '#cfd6ee'); v.b(0, 1.45, 0, 2.0, 0.2, 2.0, '#e4e9fa')
  v.b(0, 2.9, 0, 0.3, 2.8, 0.3, p.trunk)
  ;[[0, 4.6, 0, 2.4], [-1.2, 3.9, 0.3, 1.5], [1.2, 4.1, -0.2, 1.6], [0.3, 5.5, 0.3, 1.4], [-0.5, 3.4, -1.0, 1.1], [0.9, 3.5, 1.0, 1.1]]
    .forEach(([x, y, z, s], i) => v.b(x, y, z, s, s * 0.8, s, p.leaf[i % 3]))
  mushroom(v, p, 1.8, 1.6); bush(v, p, -1.9, 1.5, 0.8)
  for (let i = 0; i < 7; i++) flower(v, p, (rnd(i + 2) - 0.5) * 5, (rnd(i + 9) - 0.5) * 5, i)
}

// Île avec un ordinateur portable (écran lumineux + cœur)
function buildLaptop(v, p) {
  island(v, p, { half: 4, depth: 4, seed: 13 })
  v.b(0.3, 0.25, 0.9, 4.4, 0.3, 3.0, p.lapBase)                       // base
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) v.b(-1.6 + c * 0.45 + 0.3, 0.46, 0.0 + r * 0.45, 0.32, 0.1, 0.32, p.dark)
  v.b(0.3, 0.5, 2.2, 1.4, 0.06, 0.8, '#7f86b3')                          // trackpad
  v.b(0.3, 2.3, -0.7, 4.4, 3.9, 0.25, p.lapBase)                          // coque de l'écran
  v.l(0.3, 2.3, -0.55, 3.9, 3.4, 0.08, '#5a2fd6')                         // dalle
  pix(v.l, HEART5, 0.3, 2.45, -0.48, 0.34, '#ff8fe0', 0.04)
  ;[0, 1, 2].forEach(i => v.l(-1.2 + i * 1.2, 1.0, -0.48, 0.9, 0.18, 0.04, ['#7df9ff', '#c9a6ff', '#ffd35e'][i]))
  pot(v, p, -3.0, 2.6, '#8f9bd6'); v.b(-3.0, 1.5, 2.6, 0.25, 1.2, 0.25, p.trunk)
  v.b(-3.0, 2.3, 2.6, 1.3, 0.9, 1.3, p.leaf[1]); v.b(-3.0, 2.9, 2.6, 0.8, 0.5, 0.8, p.leaf[2])
  bush(v, p, 3.2, -2.6, 0.9); mushroom(v, p, 3.0, 2.8)
  for (let i = 0; i < 6; i++) flower(v, p, (rnd(i + 4) - 0.5) * 7, (rnd(i + 8) - 0.5) * 7, i)
}

// Île avec le panneau "Merci" (le texte est dessiné par <TextBoard />)
function buildThanks(v, p) {
  island(v, p, { half: 4, depth: 4, seed: 17 })
  v.b(0, 2.2, -0.6, 0.5, 4.4, 0.5, p.woodD)
  pot(v, p, -2.8, 1.6); v.b(-2.8, 1.5, 1.6, 0.25, 1.4, 0.25, p.trunk)
  v.b(-2.8, 2.6, 1.6, 1.5, 1.0, 1.5, p.leaf[0]); v.b(-2.8, 3.3, 1.6, 0.9, 0.6, 0.9, p.leaf[2])
  bush(v, p, 3.0, 1.2, 1.1); bush(v, p, 2.2, 2.4, 0.7)
  v.b(3.3, 1.2, -2.8, 1.0, 2.4, 1.0, p.stone)                              // petite stèle
  for (let i = 0; i < 8; i++) flower(v, p, (rnd(i + 6) - 0.5) * 7, (rnd(i + 3) - 0.5) * 7, i)
}

// Île avec le château, la lune et des nuages
function buildCastle(v, p) {
  island(v, p, { half: 4, depth: 5, seed: 19 })
  v.b(0, 1.1, 0, 4.6, 2.2, 4.6, p.stone)
  ;[0.6, 1.5].forEach(y => v.b(0, y, 0, 4.7, 0.12, 4.7, p.stoneL))
  v.b(0, 3.2, 0, 3.0, 2.0, 3.0, p.stoneL)
  ;[[1.0, 1.1], [-1.0, 1.1]].forEach(([x]) => v.l(x, 1.2, 2.33, 0.5, 0.8, 0.05, p.lantern))
  ;[[0, 3.3]].forEach(([x, y]) => v.l(x, y, 1.53, 0.6, 0.9, 0.05, p.lantern))
  ;[[3.6, 0.6], [2.8, 0.7], [2.0, 0.7], [1.0, 0.7]].forEach(([w, h], i) => v.b(0, 4.55 + i * 0.7, 0, w, h, w, p.roof))
  v.b(0, 7.6, 0, 0.12, 1.0, 0.12, p.woodD); v.l(0.35, 7.85, 0, 0.6, 0.35, 0.08, '#ff6fae')
  ;[[-2.2, 2.0], [2.2, 2.0]].forEach(([x, z]) => { v.b(x, 1.6, z, 0.9, 3.2, 0.9, p.stone); v.b(x, 3.5, z, 1.1, 0.6, 1.1, p.roof) })
  tree(v, p, 3.2, -2.6, 1.2, 0.5); bush(v, p, -3.2, -2.4, 0.9)
  for (let i = 0; i < 5; i++) flower(v, p, (rnd(i + 5) - 0.5) * 7, 2.9 + rnd(i) * 0.6, i)
}

// Panneau "Merci…" : texture dessinée sur un canvas (nette, pixelisée, multilingue)
function TextBoard({ theme, text }) {
  const invalidate = useThree(s => s.invalidate)
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 160; c.height = 100
    const t = new THREE.CanvasTexture(c)
    t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  useEffect(() => {
    const p = PAL[theme] || DARK, ctx = tex.image.getContext('2d')
    const draw = () => {
      const rtl = /[\u0600-\u06FF]/.test(text)
      const fam = getComputedStyle(document.body).getPropertyValue(rtl ? '--ar' : '--px').trim() || 'monospace'
      const words = text.split(' '), lines = []
      words.forEach(w => { const l = lines[lines.length - 1]; (l && (l + ' ' + w).length <= 11) ? lines[lines.length - 1] = l + ' ' + w : lines.push(w) })
      ctx.imageSmoothingEnabled = false; ctx.direction = rtl ? 'rtl' : 'ltr'
      ctx.fillStyle = p.sign; ctx.fillRect(0, 0, 160, 100)
      ctx.strokeStyle = p.signEdge; ctx.lineWidth = 4; ctx.strokeRect(2, 2, 156, 96)
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      let size = 18
      do { ctx.font = `700 ${size}px ${fam}`; size-- } while (size > 9 && lines.some(l => ctx.measureText(l).width > 138))
      lines.forEach((l, i) => { ctx.fillStyle = i ? p.signB : p.signA; ctx.fillText(l, 80, 28 + i * 24) })
      ctx.fillStyle = '#ff6fae'
      HEART5.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === 'X') ctx.fillRect(69 + c * 4, 72 + r * 4, 4, 4) }))
      tex.needsUpdate = true; invalidate()
    }
    draw(); document.fonts?.ready.then(draw)
  }, [theme, text, tex, invalidate])
  const p = PAL[theme] || DARK
  return (
    <group position={[0, 5.0, -0.3]} rotation={[0, 0, 0]}>
      <mesh><boxGeometry args={[5.0, 3.2, 0.3]} /><meshStandardMaterial color={p.woodD} roughness={1} /></mesh>
      <mesh position={[0, 0, 0.16]}><planeGeometry args={[4.7, 2.95]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
    </group>
  )
}

const KINDS = {
  plant:  { build: buildPlant,  view: { target: [0, 2.6, 0], W: 9,  H: 12 } },
  laptop: { build: buildLaptop, view: { target: [0, 1.4, 0], W: 12, H: 11 } },
  thanks: { build: buildThanks, view: { target: [0, 2.4, 0], W: 14, H: 11 } },
  castle: { build: buildCastle, view: { target: [0, 2.6, 0], W: 14, H: 13 } },
}

function World({ kind, theme, text, reduce }) {
  const g = useRef(), k = KINDS[kind], p = PAL[theme] || DARK
  useFrame(({ clock, pointer }) => {
    if (reduce || !g.current) return
    g.current.rotation.y = Math.sin(clock.elapsedTime * 0.4 + kind.length) * 0.1 + pointer.x * 0.15
  })
  return (
    <group ref={g}>
      <Part build={k.build} theme={theme} bob={reduce ? 0 : 0.15}>
        {kind === 'thanks' && <group rotation={[0, Math.PI / 4, 0]}><TextBoard theme={theme} text={text} /></group>}
        {kind === 'castle' && <pointLight position={[0, 2.5, 3]} color={p.plc} intensity={p.pl * 0.6} distance={9} />}
      </Part>
      {kind === 'castle' && (
        <>
          <Part build={buildMoon} theme={theme} rot={Math.PI / 4} pos={[-3.5, 8.5, -6]} />
          <Part build={buildCloud} theme={theme} rot={Math.PI / 4} pos={[5.5, 5.5, -3]} bob={reduce ? 0 : 0.2} phase={1} />
          <Part build={buildCloudPink} theme={theme} rot={Math.PI / 4} pos={[-6, 0.5, 3]} bob={reduce ? 0 : 0.2} phase={2} />
        </>
      )}
    </group>
  )
}

export default function MiniIsland({ kind = 'plant', theme = 'dark', text = '' }) {
  const p = PAL[theme] || DARK
  const reduce = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const box = useRef(null)
  const [seen, setSeen] = useState(true)
  useEffect(() => {
    const el = box.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={box} style={{ width: '100%', height: '100%' }}>
      <Canvas orthographic dpr={1.5} frameloop={!reduce && seen ? 'always' : 'demand'}
        gl={{ antialias: false, alpha: true }} camera={{ near: -60, far: 120, zoom: 20 }}>
        <Rig {...KINDS[kind].view} />
        <ambientLight color={p.amb} intensity={p.ambI} />
        <directionalLight color={p.sun} position={[6, 10, 5]} intensity={p.sunI} />
        <World kind={kind} theme={theme} text={text} reduce={reduce} />
      </Canvas>
    </div>
  )
}