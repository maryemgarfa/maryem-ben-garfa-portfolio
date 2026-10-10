// Générateur de cube isométrique en Pixel Art 3D (sans dépendance, utilisable côté serveur et client).
// Le logo et les visuels de remplacement des projets utilisent le même cube :
//   kind "code" → "<" et ">" sur les faces (développement)
//   kind "cart" → sac de courses et cœur (e-commerce)

export const CUBE_PAL = {
  T: '#7fe3ff', H: '#d8fbff', L: '#2a8fd0', R: '#1a64a8', E: '#5cc3f0', O: '#0e3a6b', G: '#ffe27a',
}

const GLYPHS = {
  code: [
    ['.....XX.', '....XX..', '...XX...', '..XX....', '.XX.....', 'XX......', '.XX.....', '..XX....', '...XX...', '....XX..', '.....XX.'],
    ['.XX.....', '..XX....', '...XX...', '....XX..', '.....XX.', '......XX', '.....XX.', '....XX..', '...XX...', '..XX....', '.XX.....'],
  ],
  cart: [
    ['...XXXX...', '..XX..XX..', '..X....X..', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX', 'XXXXXXXXXX'],
    ['.XX...XX.', 'XXXX.XXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....'],
  ],
}

// Renvoie { grid, w, h } : grid[y][x] = lettre de la palette ou '.' (vide)
export function cubeGrid(kind = 'code', s = 8, h = 16) {
  const W = 4 * s, D = 2 * s, H = D + h
  const g = Array.from({ length: H }, () => Array(W).fill('.'))
  const last = Array(W).fill(0)
  for (let r = 0; r < D; r++) {
    const rr = r < s ? r : D - 1 - r, half = 2 * (rr + 1)
    for (let x = 2 * s - half; x < 2 * s + half; x++) { g[r][x] = 'T'; last[x] = r }
  }
  for (let x = 0; x < W; x++) for (let k = 1; k <= h; k++) g[last[x] + k][x] = x < 2 * s ? 'L' : 'R'
  // arête centrale + liseré clair entre le dessus et les côtés
  for (let y = 0; y < H; y++) if (g[y][2 * s - 1] === 'L') g[y][2 * s - 1] = 'E'
  for (let y = 0; y < H - 1; y++) for (let x = 0; x < W; x++) if (g[y][x] === 'T' && (g[y + 1][x] === 'L' || g[y + 1][x] === 'R' || g[y + 1][x] === 'E')) g[y][x] = 'H'
  // glyphes : un par face, suivent la pente de la face
  const [gl, gr] = GLYPHS[kind] || GLYPHS.code
  const put = (gly, xOff) => {
    const gw = gly[0].length, gh = gly.length
    const x0 = xOff + Math.floor((2 * s - gw) / 2), y0 = Math.floor((h - gh) / 2)
    gly.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === 'X') g[last[x0 + c] + 1 + y0 + r][x0 + c] = 'G' }))
  }
  put(gl, 0); put(gr, 2 * s)
  // contour : tout pixel de la silhouette au contact du vide
  const out = g.map(r => r.slice())
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (g[y][x] === '.') continue
    const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (g[y + dy]?.[x + dx] ?? '.') === '.')
    if (n && g[y][x] !== 'G') out[y][x] = 'O'
  }
  return { grid: out, w: W, h: H }
}

// Chemins SVG groupés par couleur (rapide à afficher)
export function cubePaths(kind, s, h) {
  const { grid, w, h: hh } = cubeGrid(kind, s, h), by = {}
  grid.forEach((row, y) => {
    let x = 0
    while (x < w) {
      const ch = row[x]
      if (ch === '.') { x++; continue }
      let e = x
      while (e < w && row[e] === ch) e++
      ;(by[ch] = by[ch] || []).push(`M${x} ${y}h${e - x + 0.02}v1.02h-${e - x + 0.02}z`)
      x = e
    }
  })
  return { w, h: hh, paths: Object.entries(by).map(([ch, d]) => ({ fill: CUBE_PAL[ch], d: d.join('') })) }
}