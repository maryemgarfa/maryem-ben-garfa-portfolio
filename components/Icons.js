// Icônes SVG légères (aucune dépendance) + petit composant pour dessiner du Pixel Art en SVG.

const STROKE = {
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
  arrow: <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14L21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  cap: <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  code: <><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></>,
  folder: <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  layers: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
}

const FILL = {
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.05c.55-1 1.9-2 3.9-2 4.1 0 4.75 2.7 4.75 6.2v5.7h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2h-4z',
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  github: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z',
}

export function Icon({ name, size = 20, className }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', className, 'aria-hidden': true, focusable: 'false' }
  if (FILL[name]) return <svg {...common} fill="currentColor"><path d={FILL[name]} /></svg>
  return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">{STROKE[name]}</svg>
}

// Dessine une grille de caractères en SVG ("." = vide). size = taille d'un pixel en px.
export function PixelArt({ rows, pal, size = 4, className }) {
  const w = rows[0].length, rects = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < w) {
      const ch = row[x]
      if (ch === '.') { x++; continue }
      let e = x
      while (e < w && row[e] === ch) e++
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={e - x + 0.02} height={1.02} fill={pal[ch]} />)
      x = e
    }
  })
  return (
    <svg className={className} width={w * size} height={rows.length * size} viewBox={`0 0 ${w} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {rects}
    </svg>
  )
}

export const HEART = ['.XX...XX.', 'XXXX.XXXX', 'XHXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....']
export const HEART_PAL = { X: '#a259ff', H: '#e2c8ff' }
export const HEART_PINK = { X: '#ff6fae', H: '#ffc2dc' }

export const PLANT = [
  '....GG......', '...GLGGG....', '..GGLGGGG...', '...GGGGG....', '....TT......', '....TT......',
  '.MMMMMMMMMM.', 'MMMMMMMMMMMM', 'DDDDDDDDDDDD', 'DEDDDDDEDDDD', '.DDDDDDDDDD.', '..DDEDDDDD..', '...DDDDDD...', '....DDDD....', '.....DD.....',
]
export const PLANT_PAL = { G: '#3fae55', L: '#7be08a', T: '#8b5a2b', M: '#4caf46', D: '#8a4b2d', E: '#a8643a' }

// Logo « </> » en Pixel Art (3 glyphes de 5×8 pixels : chevron, barre oblique, chevron)
const _L = ['...XX', '..XX.', '.XX..', 'XX...', 'XX...', '.XX..', '..XX.', '...XX']
const _R = _L.map(r => [...r].reverse().join(''))
const _S = ['...XX', '...XX', '..XX.', '..XX.', '.XX..', '.XX..', 'XX...', 'XX...']
export const CODE = _L.map((r, i) => (r + '.' + _S[i] + '.' + _R[i]).replace(/X/g, i === 0 ? 'H' : 'X'))
export const CODE_PAL = HEART_PAL
export const CODE_PINK = HEART_PINK