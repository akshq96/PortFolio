# Portfolio Generator — Local/Vercel Setup

This frontend has been detached from Replit-specific Vite configuration. It runs as a normal Vite + React application.

## Run locally

```bash
cd artifacts/portfolio
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

The `vercel.json` is already configured for Vite/SPA routing.

From `artifacts/portfolio`:

```bash
npx vercel
```

Or import the repository in Vercel and set the project root to:

`artifacts/portfolio`

Build command: `npm run build`

Output directory: `dist`

Install command: `npm install`
