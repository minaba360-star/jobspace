## Quick orientation for AI assistants working on JobSpace

This repo contains a React + TypeScript frontend (Vite) and lightweight local API servers (json-server + Express). Use this note to move fast and make low-risk, high-value changes.

- Project roots
  - Frontend: `final-react-project-onfp/` (Vite + React + TS). Key files: `package.json`, `vite.config.ts`, `tsconfig.json`.
  - Local API: `nodejs/` (json-server wrapper) and an Express API at `final-react-project-onfp/server.js` used for uploads and full CRUD.
  - DB files: `final-react-project-onfp/db.json` and `nodejs/db.json` (both hold sample `candidats`, `offres`, `recruteurs`).

- How to run (local dev)
  1. Frontend: cd into `final-react-project-onfp` → `npm install` → `npm run dev` (Vite serves on http://localhost:5173).
  2. API (choose one):
     - Simple JSON API: cd into `nodejs` → `npm install` → `npm start` (json-server on http://localhost:3000).
     - Express API (supports file uploads, richer routes): from `final-react-project-onfp` run `npm run server` (this starts the Express server in `final-react-project-onfp/server.js` on port 3001).

- Important commands (from `final-react-project-onfp/package.json`)
  - `npm run dev` — start frontend (Vite)
  - `npm run build` — TypeScript build + Vite build
  - `npm run server` — start Express API (uploads handler) in the frontend folder
  - `npm run lint` — run ESLint

- Key integration and data-flow details
  - Several components call backend endpoints directly (example: `src/components/Accueil.tsx` uses `fetch('https://nodejs-o9wk.onrender.com/offres')` — note this is a deployed URL; local dev uses `http://localhost:3000/offres` or `http://localhost:3001/offres` depending on which server you run).
  - API helper: check `src/config/api.ts` to centralize base URLs; however some components still use hard-coded endpoints — prefer consolidating to `src/config/api.ts` when changing network logic.
  - File uploads are handled by the Express server in `final-react-project-onfp/server.js` and saved to an `uploads/` folder which is served statically at `/uploads`.

- Conventions & patterns to follow
  - TypeScript-first: prefer using the project's types (e.g. `Offer` in `src/data/offers.ts`) when editing components.
  - Local session: authentication is lightweight. Sessions are stored in `localStorage` under the `user` key (see `src/components/Login.tsx`, `ProtectedRoute.tsx`).
  - Styling: Tailwind + `@tailwindcss/vite` plugin; no CSS framework changes without updating `vite.config.ts`.
  - Data manipulation: persistent sample data lives in `db.json` — modify cautiously and keep schema shape (objects with `id`, `title`, `type`, `location`, `domain`, etc.).

- Files to inspect for typical tasks
  - UI / pages: `src/components/Accueil.tsx`, `Login.tsx`, `Dashboard*`, `DetailOffre.tsx`.
  - API/config: `src/config/api.ts`, `final-react-project-onfp/server.js`, `nodejs/server.js`, `db.json` files.
  - Tooling: `final-react-project-onfp/package.json`, `nodejs/package.json`, `vite.config.ts`, `tsconfig.json`.

- Safe edit checklist (before PRs)
  - Run `npm run lint` in `final-react-project-onfp` and fix ESLint issues.
  - Validate dev run: `npm run dev` (frontend) + chosen API server (`nodejs` or Express). Open http://localhost:5173 and test key flows (login, listing offers, apply/upload).
  - Keep API URLs centralized where possible; search for hard-coded `http`/`https` endpoints (components like `Accueil.tsx` may need updating).

- Notes for reviewers
  - There are two API implementations (json-server in `nodejs/` and an Express server in `final-react-project-onfp/server.js`). Confirm which the change targets and document port expectations in PR description.

- If anything here looks off or you'd like examples added (e.g., a concrete migration to use `src/config/api.ts`), tell me which area to expand and I will iterate.
