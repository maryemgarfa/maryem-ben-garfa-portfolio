// NEXT_PUBLIC_BASE_PATH est défini automatiquement par .github/workflows/deploy.yml
// (ex. "/portfolio" si le dépôt s'appelle "portfolio", vide pour un dépôt "<pseudo>.github.io").
// En local (npm run dev) il est vide : rien à configurer.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath && { basePath, assetPrefix: basePath }),
}
