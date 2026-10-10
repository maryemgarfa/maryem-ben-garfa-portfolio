'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  Scène Pixel Art 3D : une île flottante construite en voxels.
 *  - "dark"  = ambiance nuit de la maquette (thème par défaut)
 *  - "light" = variante jour (thème clair)
 *  Tout est fait de cubes, rendus en InstancedMesh (très léger).
 * ------------------------------------------------------------------ */

// ---------- Palettes ----------
const DARK = {
  night: true,
  amb: '#b4aeff', ambI: 1.2, sun: '#dde2ff', sunI: 1.7, pl: 22, plc: '#ffb454',
  grass: ['#3f9d3f', '#52b043', '#348f3a'], moss: '#2f7d3a',
  dirt: ['#8a4b2d', '#9c5a34', '#74402a', '#a8643a'],
  water: '#2ec5ff', waterL: '#9af2ff',
  wood: '#8a5430', woodD: '#5a3320', desk: '#b57640',
  leaf: ['#2f8f46', '#3fae55', '#58c96a'], trunk: '#7b4a2b',
  hair: '#5a2e1c', skin: '#f2c29b', hoodie: '#2e2e63', hoodieD: '#22224a', pants: '#3b3b72', chair: '#9a45d8',
  lapBase: '#9aa0c8', lapLid: '#cfd3f0', heart: '#d66bff', lantern: '#ffc766',
  cat: '#f0842c', catD: '#c9631a', white: '#f6f6ff', dark: '#1d1838',
  books: ['#e0457b', '#4aa3ff', '#ffc247', '#6ad6a0', '#a77bff'],
  stone: '#6a6f9a', stoneL: '#8a90bd', roof: '#7b4bd6', win: '#6ad2ff',
  cloud: '#b9a4ff', cloudD: '#8f7be6', cloud2: '#ff9fd4', cloud2D: '#e070b6',
  moon: '#fff1b8', flowers: ['#ff8fb8', '#ffd35e', '#9ad0ff', '#ffffff'],
  sign: '#241a63', signEdge: '#7c5cff', signA: '#ffffff', signB: '#c9a6ff',
}
const LIGHT = {
  ...DARK,
  night: false, amb: '#ffffff', ambI: 1.05, sun: '#fff4e0', sunI: 1.4, pl: 4, plc: '#ffd98a',
  grass: ['#6ccf6a', '#7fdc78', '#5cc063'], moss: '#4fb26a',
  dirt: ['#e5a487', '#efb59b', '#d78f78', '#f3c3a8'],
  water: '#6fd6ff', waterL: '#c4f3ff',
  hoodie: '#7b69b5', hoodieD: '#6a58a3', pants: '#8c7fc4', stone: '#a9aed6', stoneL: '#c6caec',
  cloud: '#ffffff', cloudD: '#ffd6e7', cloud2: '#ffe3ef', cloud2D: '#ffc2dc',
  moon: '#fff3a8', sign: '#fff0f7', signEdge: '#ff6fae', signA: '#4a2f7a', signB: '#c0357f',
}
const PAL = { dark: DARK, light: LIGHT }

// ---------- Outils de construction ----------
const rnd = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const pick = (arr, n) => arr[Math.floor(rnd(n) * arr.length) % arr.length]

// Collecte de cubes : b = matière normale, l = matière lumineuse (glow)
function Vox() {
  const s = [], g = []
  return {
    s, g,
    b: (x, y, z, w, h, d, c) => s.push([x, y, z, w, h, d, c]),
    l: (x, y, z, w, h, d, c) => g.push([x, y, z, w, h, d, c]),
  }
}

// Dessine une grille de pixels ("X" = cube) dans le plan XY, face à +Z
function pix(fn, rows, cx, cy, z, cell, color, depth = 0.06) {
  const w = rows[0].length
  rows.forEach((row, r) => [...row].forEach((ch, c) => {
    if (ch === 'X') fn(cx + (c - (w - 1) / 2) * cell, cy + ((rows.length - 1) / 2 - r) * cell, z, cell, cell, depth, color)
  }))
}

// Demi-largeur d'une couche de l'île (elle s'affine vers le bas)
const hAt = (half, depth, k) => Math.max(1, Math.round(half * (1 - (0.72 * k) / (depth + 1))))

function island(v, p, { half, depth, seed = 1 }) {
  for (let i = -half; i < half; i++) for (let j = -half; j < half; j++) {
    v.b(i + 0.5, -0.5, j + 0.5, 1, 1, 1, pick(p.grass, seed * 100 + i * 13 + j * 7))
  }
  for (let k = 1; k <= depth; k++) {
    const h = hAt(half, depth, k)
    for (let i = -h; i < h; i++) for (let j = -h; j < h; j++) {
      const edge = i === -h || i === h - 1 || j === -h || j === h - 1
      const n = seed * 977 + k * 31 + i * 17 + j * 5
      if (edge && k > 1 && rnd(n) < 0.2) continue
      v.b(i + 0.5, -0.5 - k, j + 0.5, 1, 1, 1, k === 1 && rnd(n + 1) < 0.35 ? p.moss : pick(p.dirt, n))
    }
  }
  const hb = hAt(half, depth, depth)
  for (let i = 0; i < 5; i++) { // petites stalactites
    const x = Math.floor((rnd(seed * 7 + i) - 0.5) * 2 * (hb - 0.5)) + 0.5
    const z = Math.floor((rnd(seed * 11 + i) - 0.5) * 2 * (hb - 0.5)) + 0.5
    for (let k = 1; k <= 1 + (i % 3); k++) v.b(x, -0.5 - depth - k, z, 1, 1, 1, pick(p.dirt, i + k))
  }
}

// ---------- Éléments de décor ----------
function tree(v, p, x, z, h = 3, s = 1) {
  v.b(x, h / 2, z, 0.7 * s, h, 0.7 * s, p.trunk)
  v.b(x, h + 0.5, z, 3.4 * s, 1.1, 3.4 * s, p.leaf[0])
  v.b(x, h + 1.5, z, 2.6 * s, 1, 2.6 * s, p.leaf[1])
  v.b(x, h + 2.4, z, 1.6 * s, 0.9, 1.6 * s, p.leaf[2])
  v.b(x + 1.2 * s, h + 0.4, z + 1.4 * s, 0.9, 0.9, 0.9, p.leaf[2])
  v.b(x - 1.3 * s, h + 0.9, z - 1.2 * s, 0.8, 0.8, 0.8, p.leaf[1])
}

function lantern(v, p, x, z, y = 0) {
  v.b(x, y + 1.1, z, 0.22, 2.2, 0.22, p.woodD)
  v.b(x, y + 2.35, z, 0.6, 0.12, 0.6, p.woodD)
  v.l(x, y + 2.75, z, 0.5, 0.6, 0.5, p.lantern)
  v.b(x, y + 3.15, z, 0.7, 0.14, 0.7, p.woodD)
}

function mushroom(v, p, x, z, y = 0) {
  v.b(x, y + 0.3, z, 0.3, 0.6, 0.3, p.white)
  v.b(x, y + 0.75, z, 0.9, 0.35, 0.9, '#e0455b')
  v.b(x + 0.2, y + 0.95, z + 0.2, 0.2, 0.1, 0.2, p.white)
}

// Glyphes pixel : "<", "/", ">" (panneau lumineux) et petit cœur
const LT = ['..X', '.X.', 'X..', '.X.', '..X']
const SL = ['..X', '..X', '.X.', 'X..', 'X..']
const GT = ['X..', '.X.', '..X', '.X.', 'X..']
const HEART5 = ['.X.X.', 'XXXXX', 'XXXXX', '.XXX.', '..X..']

function shelf(v, p, x, z) {
  v.b(x, 2.8, z - 0.5, 4.4, 5.6, 0.2, p.woodD)
  v.b(x - 2.1, 2.8, z, 0.25, 5.6, 1.2, p.wood)
  v.b(x + 2.1, 2.8, z, 0.25, 5.6, 1.2, p.wood)
  ;[0.1, 1.5, 2.9, 4.3, 5.6].forEach(y => v.b(x, y, z, 4.4, 0.2, 1.2, p.wood))
  ;[0.2, 1.6, 3.0, 4.4].forEach((y0, li) => {
    for (let i = 0; i < 9; i++) {
      const n = li * 17 + i
      if (rnd(n + 3) < 0.18 || (li === 2 && i > 5) || (li === 3 && i < 3)) continue
      const h = 0.85 + rnd(n) * 0.35
      v.b(x - 1.85 + i * 0.4, y0 + h / 2, z + 0.1, 0.32, h, 0.8, pick(p.books, n))
    }
  })
  // petite plante + lampe sur les étagères
  v.b(x + 1.2, 3.25, z + 0.1, 0.5, 0.5, 0.5, p.pants)
  v.b(x + 1.2, 3.75, z + 0.1, 0.7, 0.6, 0.7, p.leaf[1])
  v.b(x + 1.2, 4.2, z + 0.1, 0.4, 0.4, 0.4, p.leaf[2])
  v.l(x - 1.4, 4.85, z + 0.1, 0.45, 0.5, 0.45, p.lantern)
  // panneau lumineux "</>"
  v.b(x, 6.7, z + 0.3, 2.9, 1.3, 0.2, p.dark)
  pix(v.l, LT, x - 0.95, 6.7, z + 0.45, 0.17, '#7df9ff')
  pix(v.l, SL, x, 6.7, z + 0.45, 0.17, '#c9a6ff')
  pix(v.l, GT, x + 0.95, 6.7, z + 0.45, 0.17, '#7df9ff')
}

function workstation(v, p, x = 0, z = -2) {
  // bureau
  v.b(x, 1.7, z, 5.2, 0.3, 2.2, p.desk)
  ;[[-2.4, -0.9], [2.4, -0.9], [-2.4, 0.9], [2.4, 0.9]].forEach(([dx, dz]) => v.b(x + dx, 0.85, z + dz, 0.3, 1.55, 0.3, p.woodD))
  // chaise
  v.b(x, 1.15, z - 1.4, 1.3, 0.25, 1.3, p.chair)
  v.b(x, 2.05, z - 2.05, 1.3, 1.8, 0.2, p.chair)
  v.b(x, 0.6, z - 1.4, 0.2, 1.1, 0.2, p.dark)
  v.b(x, 0.1, z - 1.4, 1.4, 0.2, 0.2, p.dark)
  v.b(x, 0.1, z - 1.4, 0.2, 0.2, 1.4, p.dark)
  // personnage : corps
  v.b(x, 2.0, z - 1.5, 1.1, 1.4, 0.7, p.hoodie)
  v.b(x, 2.55, z - 1.85, 1.0, 0.4, 0.3, p.hoodieD)
  v.b(x, 2.78, z - 1.5, 0.35, 0.2, 0.35, p.skin)
  v.b(x, 1.4, z - 0.85, 1.0, 0.3, 1.2, p.pants)
  ;[-0.3, 0.3].forEach(dx => { v.b(x + dx, 0.65, z - 0.3, 0.35, 1.3, 0.35, p.pants); v.b(x + dx, 0.1, z - 0.15, 0.38, 0.2, 0.5, p.white) })
  ;[-1, 1].forEach(s => {
    v.b(x + s * 0.7, 2.2, z - 1.5, 0.3, 0.9, 0.3, p.hoodie)
    v.b(x + s * 0.55, 1.85, z - 0.75, 0.3, 0.3, 1.1, p.hoodie)
    v.b(x + s * 0.5, 2.0, z - 0.1, 0.3, 0.2, 0.3, p.skin)
  })
  // personnage : tête, cheveux, visage
  v.b(x, 3.3, z - 1.5, 0.95, 0.9, 0.9, p.skin)
  v.b(x, 3.85, z - 1.5, 1.15, 0.3, 1.1, p.hair)
  v.b(x, 3.35, z - 1.9, 1.15, 1.1, 0.35, p.hair)
  ;[-1, 1].forEach(s => {
    v.b(x + s * 0.55, 3.2, z - 1.5, 0.2, 0.9, 0.95, p.hair)
    v.b(x + s * 0.62, 2.6, z - 1.3, 0.22, 1.3, 0.45, p.hair)
    v.b(x + s * 0.4, 3.45, z - 1.02, 0.2, 0.4, 0.12, p.hair)
    v.b(x + s * 0.22, 3.3, z - 1.03, 0.12, 0.17, 0.04, '#2a1a2a')
    v.b(x + s * 0.34, 3.12, z - 1.03, 0.16, 0.08, 0.03, '#ff9bb0')
  })
  v.b(x, 3.65, z - 1.0, 1.0, 0.28, 0.15, p.hair)
  // ordinateur portable (le dos du capot, avec le cœur lumineux, regarde la caméra)
  v.b(x, 1.95, z + 0.4, 1.9, 0.1, 1.3, p.lapBase)
  v.b(x, 2.55, z + 1.0, 1.9, 1.2, 0.08, p.lapLid)
  pix(v.l, HEART5, x, 2.55, z + 1.06, 0.17, p.heart, 0.04)
  // objets sur le bureau
  v.b(x - 2.0, 1.95, z - 0.7, 0.5, 0.2, 0.5, p.woodD)
  v.l(x - 2.0, 2.4, z - 0.7, 0.45, 0.55, 0.45, p.lantern)
  v.b(x + 1.9, 2.1, z + 0.6, 0.5, 0.5, 0.5, p.white)
  v.b(x + 2.2, 2.1, z + 0.6, 0.12, 0.3, 0.2, p.white)
  v.b(x + 2.0, 2.05, z - 0.8, 0.5, 0.4, 0.5, p.cat)
  v.b(x + 2.0, 2.45, z - 0.8, 0.7, 0.5, 0.7, p.leaf[1])
}

function cat(v, p, x, z) {
  v.b(x, 0.55, z, 1.0, 1.1, 1.0, p.cat)
  v.b(x, 0.45, z + 0.52, 0.5, 0.7, 0.05, p.white)
  v.b(x, 1.5, z + 0.1, 1.0, 0.8, 0.8, p.cat)
  v.b(x, 1.93, z + 0.1, 0.14, 0.12, 0.8, p.catD)
  ;[-1, 1].forEach(s => {
    v.b(x + s * 0.32, 2.0, z + 0.1, 0.25, 0.3, 0.25, p.cat)
    v.b(x + s * 0.22, 1.55, z + 0.51, 0.12, 0.16, 0.04, p.dark)
    v.b(x + s * 0.25, 0.12, z + 0.55, 0.3, 0.25, 0.3, p.white)
  })
  v.b(x, 1.33, z + 0.52, 0.4, 0.2, 0.04, p.white)
  v.b(x, 1.4, z + 0.53, 0.1, 0.08, 0.04, '#ff8fb8')
  v.b(x + 0.7, 0.3, z - 0.4, 0.25, 0.25, 1.0, p.cat)
  v.b(x + 0.7, 0.95, z - 0.88, 0.25, 1.0, 0.25, p.cat)
  v.b(x + 0.7, 1.5, z - 0.88, 0.25, 0.2, 0.25, p.white)
}

function waterfall(v, p, half, depth, zc) {
  v.l(half - 0.9, 0.05, zc, 1.8, 0.1, 1.9, p.water)
  v.l(half - 1.2, 0.12, zc - 0.3, 0.45, 0.04, 0.45, p.waterL)
  for (let k = 0; k <= depth + 1; k++) {
    v.l(half + 0.13, -0.5 - k, zc, 0.26, 1, 1.9 - Math.max(0, k - depth) * 0.12, k % 2 ? p.waterL : p.water)
  }
  for (let i = 0; i < 7; i++) {
    v.l(half + 0.3 + rnd(i + 5) * 0.5, -depth - 1.2 - rnd(i) * 1.0, zc + (rnd(i + 9) - 0.5) * 1.6, 0.2, 0.2, 0.2, p.waterL)
  }
}

function buildMain(v, p) {
  island(v, p, { half: 6, depth: 6, seed: 3 })
  waterfall(v, p, 6, 6, 1.0)
  shelf(v, p, -2.5, -5.2)
  workstation(v, p, 0, -2)
  cat(v, p, 2.9, -0.1)
  // pile de livres au sol
  v.b(-3.7, 0.2, 0.4, 1.5, 0.4, 1.0, p.books[0])
  v.b(-3.6, 0.6, 0.45, 1.3, 0.4, 0.9, p.books[1])
  v.b(-3.75, 1.0, 0.4, 1.4, 0.4, 1.0, p.books[2])
  v.b(-3.6, 1.45, 0.4, 0.5, 0.5, 0.5, p.white)
  tree(v, p, -4.6, 2.4, 3, 0.85)
  tree(v, p, 5.0, -5.4, 2.6, 0.8)
  v.b(-5.2, 0.5, -1.0, 1.1, 1, 1.1, p.leaf[0])
  lantern(v, p, -5.3, 1.6)
  lantern(v, p, 5.3, -1.6)
  v.b(4.9, 1.6, -3.4, 0.35, 3.2, 0.35, p.woodD) // poteau du panneau
  for (let i = 0; i < 18; i++) {
    const x = (rnd(i * 3 + 1) - 0.5) * 10.6, z = (rnd(i * 3 + 2) - 0.5) * 10.6
    if (Math.abs(x) < 3.4 && z > -4.2 && z < 0.4) continue
    if (x > 3.8 && z > -0.2 && z < 2.2) continue
    v.b(x, 0.12, z, 0.2, 0.24, 0.2, i % 3 ? pick(p.flowers, i) : p.leaf[0])
  }
}

function buildLeftIsland(v, p) {
  island(v, p, { half: 2, depth: 3, seed: 7 })
  lantern(v, p, -0.6, 0.4)
  mushroom(v, p, 0.9, 0.7)
  mushroom(v, p, 1.2, -0.6)
  v.b(-0.9, 0.35, -0.9, 0.9, 0.7, 0.9, p.leaf[1])
}

function buildTowerIsland(v, p) {
  island(v, p, { half: 3, depth: 4, seed: 5 })
  v.b(0, 2.3, 0, 2.4, 4.6, 2.4, p.stone)
  ;[1.2, 2.4, 3.6].forEach(y => v.b(0, y, 0, 2.5, 0.12, 2.5, p.stoneL))
  v.l(0, 3.2, 1.23, 0.5, 0.8, 0.05, p.win)
  v.l(1.23, 3.2, 0, 0.05, 0.8, 0.5, p.win)
  ;[[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]].forEach(([x, z]) => v.b(x, 4.9, z, 0.5, 0.6, 0.5, p.stone))
  ;[[3.1, 0.6], [2.4, 0.5], [1.6, 0.5], [0.6, 0.5]].forEach(([w, h], i) => v.b(0, 5.2 + i * 0.6 + 0.3, 0, w, 0.6, w, p.roof))
  v.l(0, 7.9, 0, 0.18, 0.5, 0.18, p.heart)
  tree(v, p, 2.0, 1.6, 1, 0.45)
}

function buildSmallIsland(v, p) {
  island(v, p, { half: 2, depth: 3, seed: 9 })
  tree(v, p, -0.4, -0.2, 1.4, 0.55)
  v.b(1.0, 0.45, 0.8, 0.9, 0.9, 0.9, p.leaf[0])
  v.b(0.9, 0.12, -0.9, 0.2, 0.24, 0.2, p.flowers[0])
}

// nuages / lune dessinés dans le plan XY (le Part les tourne face à la caméra)
function buildCloud(v, p) {
  ;[[0, 0, 6, 1.1], [-1.7, 0.7, 3, 1.1], [1.3, 0.8, 3.4, 1.1], [-0.2, 1.5, 2.6, 1]].forEach(([x, y, w, h], i) => {
    v.b(x, y, 0, w, h, 1.3, i ? p.cloud : p.cloudD)
  })
  v.b(0, -0.2, 0, 6, 0.5, 1.35, p.cloudD)
}
function buildCloudPink(v, p) {
  ;[[0, 0, 5, 1], [-1.2, 0.7, 2.6, 1], [1.2, 0.7, 2.8, 1]].forEach(([x, y, w, h], i) => v.b(x, y, 0, w, h, 1.2, i ? p.cloud2 : p.cloud2D))
}
function buildMoon(v, p) {
  const R = 2.6, c = 0.5
  for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) {
    const x = i * c, y = j * c
    if (x * x + y * y > R * R) continue
    if (p.night && (x - 0.9) ** 2 + (y - 0.55) ** 2 < (R * 0.92) ** 2) continue
    v.l(x, y, 0, c, c, c, p.moon)
  }
}

// ---------- Rendu ----------
function Voxels({ items, glow }) {
  const ref = useRef()
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const o = new THREE.Object3D(), c = new THREE.Color()
    items.forEach(([x, y, z, w, h, d, col], i) => {
      o.position.set(x, y, z); o.scale.set(w, h, d); o.updateMatrix()
      m.setMatrixAt(i, o.matrix); m.setColorAt(i, c.set(col))
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [items])
  if (!items.length) return null
  return (
    <instancedMesh ref={ref} key={items.length} args={[undefined, undefined, items.length]} frustumCulled={false}>
      <boxGeometry />
      {glow ? <meshBasicMaterial toneMapped={false} /> : <meshStandardMaterial roughness={1} flatShading />}
    </instancedMesh>
  )
}

function Part({ build, theme, pos = [0, 0, 0], rot = 0, bob = 0, phase = 0, children }) {
  const ref = useRef()
  const v = useMemo(() => { const x = Vox(); build(x, PAL[theme] || DARK); return x }, [theme])
  useFrame(({ clock }) => {
    if (bob && ref.current) ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * 0.7 + phase) * bob
  })
  return (
    <group ref={ref} position={pos} rotation={[0, rot, 0]}>
      <Voxels items={v.s} /><Voxels items={v.g} glow />
      {children}
    </group>
  )
}

// Panneau "Better Websites Brighter Ideas" : texture dessinée sur un canvas
function SignBoard({ theme }) {
  const invalidate = useThree(s => s.invalidate)
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 160; c.height = 128
    const t = new THREE.CanvasTexture(c)
    t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter
    t.generateMipmaps = false; t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  useEffect(() => {
    const p = PAL[theme] || DARK, ctx = tex.image.getContext('2d')
    const draw = () => {
      const fam = getComputedStyle(document.body).getPropertyValue('--px').trim() || 'monospace'
      const lines = [['Better', p.signA], ['Websites', p.signA], ['Brighter', p.signB], ['Ideas', p.signB]]
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = p.sign; ctx.fillRect(0, 0, 160, 128)
      ctx.strokeStyle = p.signEdge; ctx.lineWidth = 4; ctx.strokeRect(2, 2, 156, 124)
      ctx.textBaseline = 'middle'
      let size = 20
      do { ctx.font = `700 ${size}px ${fam}`; size-- } while (size > 9 && ctx.measureText('Websites').width > 136)
      lines.forEach(([txt, col], i) => { ctx.fillStyle = col; ctx.fillText(txt, 14, 24 + i * 26) })
      ctx.fillStyle = '#ff6fae'
      HEART5.forEach((row, r) => [...row].forEach((ch, cc) => { if (ch === 'X') ctx.fillRect(112 + cc * 5, 94 + r * 5, 5, 5) }))
      tex.needsUpdate = true; invalidate()
    }
    draw()
    document.fonts?.ready.then(draw)
  }, [theme, tex, invalidate])
  const p = PAL[theme] || DARK
  return (
    <group position={[4.9, 4.55, -3.4]} rotation={[0, 0.55, 0]}>
      <mesh><boxGeometry args={[4.5, 3.6, 0.2]} /><meshStandardMaterial color={p.woodD} roughness={1} /></mesh>
      <mesh position={[0, 0, 0.11]}><planeGeometry args={[4.2, 3.36]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
    </group>
  )
}

// Repère de la caméra isométrique : permet de placer un objet à une position d'écran donnée
const D = new THREE.Vector3(-11, -7.4, -11).normalize()
const R = new THREE.Vector3().crossVectors(D, new THREE.Vector3(0, 1, 0)).normalize()
const U = new THREE.Vector3().crossVectors(R, D)
const at = (sx, sy, k = 0) => new THREE.Vector3().addScaledVector(R, sx).addScaledVector(U, sy).addScaledVector(D, k).toArray()

function Stars({ night }) {
  const items = useMemo(() => {
    if (!night) return []
    return Array.from({ length: 48 }, (_, i) => {
      const [x, y, z] = at((rnd(i) - 0.5) * 28, -9 + rnd(i + 50) * 24, 22)
      const s = 0.1 + rnd(i + 99) * 0.1
      return [x, y, z, s, s, s, i % 4 ? '#ffffff' : '#b9a7ff']
    })
  }, [night])
  return <Voxels items={items} glow />
}

function Sparkles({ theme, reduce }) {
  const g = useRef()
  const cols = theme === 'light' ? ['#ff8fb8', '#c9b6ff', '#8be0c0', '#ffc09f'] : ['#c9a6ff', '#7df9ff', '#ff9fd4', '#ffd35e']
  const seeds = useMemo(() => Array.from({ length: 14 }, (_, i) => [Math.sin(i * 12.9) * 6.5, 1.5 + (i % 5) * 1.2, Math.cos(i * 7.3) * 6.5]), [])
  useFrame(({ clock }) => {
    if (reduce || !g.current) return
    g.current.children.forEach((m, i) => { m.position.y = seeds[i][1] + Math.sin(clock.elapsedTime * 0.8 + i) * 0.5 })
  })
  return (
    <group ref={g}>
      {seeds.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}><boxGeometry args={[0.14, 0.14, 0.14]} /><meshBasicMaterial color={cols[i % 4]} /></mesh>
      ))}
    </group>
  )
}

function World({ theme, hero, reduce }) {
  const g = useRef(), p = PAL[theme] || DARK
  const bob = n => (reduce ? 0 : n)
  useFrame(({ clock, pointer }) => {
    if (reduce || !g.current) return
    // héros : balancement léger ; bureau (À propos) : un peu plus marqué pour que la scène vive
    g.current.rotation.y = Math.sin(clock.elapsedTime * (hero ? 0.25 : 0.4)) * (hero ? 0.05 : 0.09) + pointer.x * (hero ? 0.1 : 0.16)
  })
  return (
    <group ref={g}>
      <Part build={buildMain} theme={theme} bob={bob(0.12)}>
        <SignBoard theme={theme} />
        <pointLight position={[-5.3, 2.8, 1.6]} color={p.plc} intensity={p.pl} distance={9} />
        <pointLight position={[5.3, 2.8, -1.6]} color={p.plc} intensity={p.pl} distance={9} />
        <pointLight position={[-2, 2.8, -2.7]} color={p.plc} intensity={p.pl * 0.7} distance={7} />
      </Part>
      {hero && (
        <>
          <Part build={buildMoon} theme={theme} rot={Math.PI / 4} pos={at(10.0, 8.6, 14)} />
          <Part build={buildCloud} theme={theme} rot={Math.PI / 4} pos={at(-7.4, 8.4, 8)} bob={bob(0.25)} phase={1} />
          <Part build={buildCloudPink} theme={theme} rot={Math.PI / 4} pos={at(-9.4, -3.4, 4)} bob={bob(0.2)} phase={3} />
          <Part build={buildLeftIsland} theme={theme} pos={at(-9.2, 2.6, 3)} bob={bob(0.3)} phase={2} />
          <Part build={buildTowerIsland} theme={theme} pos={at(6.2, 3.0, 9)} bob={bob(0.25)} phase={4} />
          <Part build={buildSmallIsland} theme={theme} pos={at(9.2, -3.4, 3)} bob={bob(0.3)} phase={5} />
          <Stars night={p.night} />
          <Sparkles theme={theme} reduce={reduce} />
        </>
      )}
    </group>
  )
}

// Cadre la caméra : zoom adapté à la taille du canvas (responsive)
function Rig({ target, W, H }) {
  const { camera, size, invalidate } = useThree()
  useLayoutEffect(() => {
    camera.zoom = Math.min(size.width / W, size.height / H)
    camera.position.set(target[0] + 11, target[1] + 7.4, target[2] + 11)
    camera.lookAt(target[0], target[1], target[2])
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size, target, W, H, invalidate])
  return null
}

const VIEWS = {
  hero: { target: [0, 1.0, 0], W: 24, H: 21.5 },
  desk: { target: [-0.3, 2.9, -3], W: 11, H: 9 },
}

export default function Scene({ theme = 'dark', variant = 'hero' }) {
  const p = PAL[theme] || DARK
  const hero = variant !== 'desk'
  const reduce = useMemo(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const view = VIEWS[hero ? 'hero' : 'desk']
  // L'animation ne tourne que lorsque la scène est visible à l'écran (économise la batterie)
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
      <Canvas orthographic dpr={hero ? 0.65 : 0.8} frameloop={!reduce && seen ? 'always' : 'demand'}
        gl={{ antialias: false }} camera={{ near: -60, far: 120, zoom: 20 }}>
        <Rig {...view} />
        <ambientLight color={p.amb} intensity={p.ambI} />
        <directionalLight color={p.sun} position={[6, 10, 5]} intensity={p.sunI} />
        <World theme={theme} hero={hero} reduce={reduce} />
      </Canvas>
    </div>
  )
}
// Briques réutilisées par les mini-îles 3D (components/MiniIsland.js)
export { PAL, DARK, rnd, pick, Vox, pix, island, tree, lantern, mushroom, HEART5, Voxels, Part, Rig, buildMoon, buildCloud, buildCloudPink }