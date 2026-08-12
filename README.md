# Portfolio Generator — Local Version

This is the cleaned, standalone version of the project. Replit-specific Vite configuration and workspace dependencies have been removed.

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**.

## Production

```bash
npm run build
npm run preview
```

## Vercel

This project already includes `vercel.json` for Vite SPA deployment.

If importing the repository into Vercel, use this folder as the project root. Vercel will use:

- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

Or from this directory:

```bash
npx vercel
```
