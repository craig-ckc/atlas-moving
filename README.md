# Atlas Moving

A polished moving-quote booking app: a customer-facing multi-step wizard plus an
internal dashboard for managing submissions.

Frontend-only prototype — submissions persist in the browser (localStorage +
IndexedDB for photos). Swap the storage layer to wire up a real backend.

## Stack

- Vite + React + TypeScript
- Tailwind v4
- [Base UI](https://base-ui.com) headless primitives
- react-hook-form + zod
- zustand (submissions store)
- react-router-dom
- lucide-react icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run build` produces a production bundle.

## Routes

- `/` — landing page
- `/quote` — 8-step booking wizard (auto-saves a draft as you type)
- `/admin` — submissions dashboard (list + detail, status workflow, notes)

The admin area is gated by a PIN. Default is `1234`; override with
`VITE_ADMIN_PIN` in a `.env` file (see `.env.example`).
