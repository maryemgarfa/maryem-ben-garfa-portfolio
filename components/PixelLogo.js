import { cubePaths } from '../lib/pixelcube'

// Logo / visuel Pixel Art 3D : cube isométrique "dev" (< >) ou "e-commerce" (sac + cœur).
// size = largeur affichée en px (le cube est carré, 32×32 pixels).
export function PixelLogo({ kind = 'code', size = 32, className }) {
  const { w, h, paths } = cubePaths(kind, 8, 16)
  return (
    <svg className={className} width={size} height={size * h / w} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {paths.map(p => <path key={p.fill} fill={p.fill} d={p.d} />)}
    </svg>
  )
}