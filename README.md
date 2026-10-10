# Portfolio — Pixel Art 3D

Next.js (export statique) + React Three Fiber. Thème nuit par défaut, thème clair, FR / EN / عربي.

## En local
```bash
npm install
npm run dev      # http://localhost:3000
```

## Personnaliser (tout est dans `lib/data.js`)
- `GITHUB` : URL de ton profil GitHub (l'icône n'apparaît que si renseignée).
- `CV` : dépose ton PDF dans `public/` sous le nom `Maryem-Ben-Garfa-CV.pdf` (ou change le chemin ; `''` masque le bouton).
- `PROJECTS` : `featured: true` = projet affiché dans « Projets en vedette ». Les captures vont dans `public/projects/`.
- Textes, parcours et compétences : même fichier.

## Déploiement gratuit sur GitHub Pages
1. Pousse le projet sur GitHub (branche `main`).
2. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.
3. Chaque `git push` sur `main` rebuild et publie le site (workflow `.github/workflows/deploy.yml`).

Le chemin de base (`/nom-du-depot`) est géré automatiquement : rien à configurer.
Pour un site à la racine (`https://pseudo.github.io`), nomme simplement le dépôt `pseudo.github.io`.
