
# NeuroSuite

NeuroSuite is a React + Vite web app prototype for EEG-based features and emotion recognition. It provides a modular UI with components for visualization, authentication, and calls out to local or remote EEG/emotion analysis services.

Key features

- Interactive brain model and scene lighting controls
- EEG decoding and sleep-stage detection UI pages
- Emotion recognition and feature extraction interfaces
- Authentication (Sign Up / Log In) and profile pages
- Lightweight service layer for API calls to EEG/emotion endpoints

Tech stack

- React (JSX) + Vite for fast development and build
- CSS for styling (see `src/index.css`)
- Small modular service layer in `src/services` for network calls

Getting started

Prerequisites

- Node.js 18+ (or current LTS)
- npm (or yarn)

Install

```bash
npm install
```

Run (development)

```bash
npm run dev
```

Build (production)

```bash
npm run build
```

Project structure (important files)

- `src/` — application source
	- `src/main.jsx` — app entry
	- `src/App.jsx` — main router / layout
	- `src/components/` — UI pages and components (e.g., `Dashboard.jsx`, `EEGDecoder.jsx`, `EmotionRecognizer.jsx`)
	- `src/context/AuthContext.jsx` — authentication context/provider
	- `src/services/` — API wrappers: `api.js`, `auth.js`, `eegApi.js`, `emotionApi.js`
- `public/` — static assets
- `vite.config.js` — Vite config

Services and APIs

The app uses small service modules in `src/services` to separate HTTP logic from components. Update the base URLs and auth handling in these files to point at your backend or mock endpoints.

Deployment

Build the project (`npm run build`) and serve the contents of the `dist/` folder with any static host (Netlify, Vercel, Surge, or a simple nginx/Apache server).

Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Open a PR with a description of changes

Suggested next steps

- Add README badges (build, lint, deploy)
- Provide environment examples (`.env.example`) for API endpoints
- Add tests and CI (GitHub Actions)

License

This project is provided as-is. Add an explicit license file if you plan to share or publish.

Contact

For questions or help, open an issue in the repository.

**What NeuroSuite Does**

NeuroSuite provides a developer-focused interface to upload, visualize, and analyze EEG data and audio/video inputs for emotion recognition. It exposes UI pages to:

- Upload EEG recordings and request classification or file metadata (`/eeg-decoder`).
- Analyze sleep stages through a dedicated detector (`/sleep-detector`).
- Run emotion recognition on audio/video/files and view per-sample results (`/emotion-recognizer`).
- Visualize application-level results and user statistics on the `Dashboard`.

The app keeps ML and signal-processing logic on server endpoints (see `src/services/*.js`), letting the front end focus on UX, data flow, and result visualization.

**Why Use NeuroSuite**

- Rapid prototyping: quickly connect your EEG or emotion-analysis model to a ready-made UI.
- Research-friendly: separates front-end visualization from back-end analysis so researchers can swap models without rewriting the UI.
- Demo and evaluation: useful for demos, user studies, or validating model outputs with real users.
- Educational: teaches data flow for biosignal applications — from file upload to result interpretation.

**How it works (high level)**

- The React front end provides pages and components under `src/components/` and manages authentication via `src/context/AuthContext.jsx`.
- Network calls go through small service modules in `src/services` (`api.js`, `eegApi.js`, `emotionApi.js`) which call backend endpoints for classification, metadata extraction, and sleep-stage detection.
- Protected routes require authentication; tokens are stored in `localStorage` and attached to requests by the services.
- The backend is expected to expose REST endpoints for `/eeg/*` and `/emotion/*` (see `src/services` for exact routes); adjust `API_BASE_URL` in `src/services/api.js` to point at your server.
