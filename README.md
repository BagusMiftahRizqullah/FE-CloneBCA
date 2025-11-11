# BCA Clone Frontend (Angular)

This frontend replicates the BCA homepage layout and consumes the backend API to load promos, news, rates, and carousel content.

## Tech Stack
- Angular 15 (CLI)
- RxJS
- SCSS

## Requirements
- Node.js v18+
- Backend running at `http://localhost:3002/`

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm start
   ```
   App will be available at `http://localhost:3000/`.

## Backend Integration
The frontend consumes the following endpoints:
- `/api/promos`, `/api/news`, `/api/rates`, `/api/carousel`, `/api/search`

API base URL configuration:
- Ensure the base URL points to `http://localhost:3002/`. Depending on your setup, this may be defined in a config/service file (e.g., `src/app/core/services/api.config.ts`) or an Angular environment file.

## Features
- Hero Carousel: displays slides with skeleton while loading.
- Promo Section: lists promos with skeleton loading and an empty-state when no data.
- News Section: featured and list views, skeleton while loading, empty-state when empty.
- Hero Rate Card: currency rates, skeleton while loading, empty-state when empty.
- Hero Search: search panel with skeleton during fetch and empty-state for no results.

## Directory Structure
```
bca-clone/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── shared/
│   │   └── features/
│   │       └── home/
│   ├── assets/
│   ├── index.html
│   └── styles.scss
└── package.json
```

## Scripts
- Development: `npm start`
- Build: `npm run build`
- Unit tests: `npm test`

## Troubleshooting
- If data doesn’t appear, ensure the backend is running on `http://localhost:3002/` and the frontend API base URL is configured correctly.
- Check the browser console and Angular dev server terminal for errors.
/*
BCA Clone – Frontend (React)

Overview
- A React-based frontend that consumes the BCA Backend API running at http://localhost:3002.
- Provides pages/components for Carousel, Promos, News, Rates (Hero Rate Card), and Search.

Tech Stack
- React 18
- Axios for HTTP requests
- React Router (if routing is enabled)
- CSS/SCSS modules or styled-components (depending on project setup)

Prerequisites
- Node.js 18+
- npm or yarn
- Running backend at http://localhost:3002

Getting Started
1) Install dependencies:
   npm install
2) Start development server:
   npm start
3) Open the app at:
   http://localhost:3000

Configuration
- Ensure API base URL points to the backend:
  Example: REACT_APP_API_BASE_URL=http://localhost:3002
  (If using a config file, set the base URL there.)

Features
- Carousel: Displays featured banners.
- Promos: Lists promotions fetched from the backend.
- News: Shows news items with details.
- Rate Card: Displays currency rates in the hero section.
- Search: Simple content search against backend index.

Directory Structure (common example)
src/
  components/
    carousel/
    hero-rate-card/
    promos/
    news/
  pages/
  services/
    api.js (Axios instance)
  assets/
  App.js
  index.js

Scripts
- npm start: Start dev server
- npm run build: Production build
- npm test: Run tests (if configured)

Troubleshooting
- If you see CORS errors, make sure the backend allows http://localhost:3000.
- If data does not load, check the API base URL and that the backend is running on port 3002.

Note on Tooling Diagnostics
- Some editors/tools may incorrectly parse Markdown files as TypeScript/JavaScript, producing errors like "Invalid character" or "; expected" in README.md.
- To suppress those false diagnostics, the entire file content is wrapped in a block comment (/* ... */).
- Recommended permanent fixes you can apply next:
  1) Exclude Markdown from TS/JS checking (tsconfig/jsconfig):
     {
       "exclude": ["**/*.md"]
     }
  2) ESLint: add ignorePatterns for **/*.md.
  3) VSCode: ensure Markdown association:
     "files.associations": { "**/*.md": "markdown" }
- After applying the permanent fixes, you can remove the /* */ wrapper to render the README normally.
*/