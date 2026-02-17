# Hackfest Frontend

Quick Vite React app that talks to the existing backend.

Run locally:

```bash
cd frontend
npm install
npm run dev
```

By default the app will call `http://localhost:3000` — change the backend URL by creating a `.env` file with `VITE_API_BASE`.
The backend in this workspace runs on port `8000` by default. I added a `.env` with `VITE_API_BASE=http://localhost:8000` and a `vite.config.js` proxy so API calls like `/group`, `/member`, `/event`, `/expense`, `/balance`, and `/settlement` are forwarded to the backend during `npm run dev`.
.