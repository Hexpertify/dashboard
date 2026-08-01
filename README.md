# Hexpertify SEO Settings Dashboard

A modern dashboard for managing SEO settings, HTML chunk pages, and social sharing previews. Built for the Hexpertify content platform.

## Features

- **Overview** — recent activity feed across all pages (creates, updates, publishes, restores)
- **HTML Chunk Pages** — create, edit, preview, and manage page content built from reusable HTML chunks
  - Per-page SEO settings (meta tags, Open Graph, robots indexing)
  - Live Google search snippet + social share preview
  - Desktop / tablet / mobile preview with device toggle
  - Image upload or URL for Open Graph images
  - Version history with restore
  - Search, filter by status, publish / unpublish / archive / delete
- **SEO Settings** — global search engine + social sharing configuration with live preview
- **Users** — user management (list, create, edit, details)
- **Auth** — login, register, forgot password
- **Profile** — profile card, appearance / theme switcher, avatar dropdown menu
- Dark mode support

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Redux Toolkit (RTK) for state management
- React Router v6
- Formik + Yup (forms + validation)
- Tailwind CSS (styling)
- Material UI v6 (Switch, LinearProgress)
- react-hot-toast (toasts)

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# typecheck
npm run typecheck

# lint
npm run lint

# production build
npm run build

# preview production build
npm run preview
```

Open `http://localhost:3000` (Vite picks the next free port if busy).

## Environment Variables

Copy the `.env` files and adjust as needed:

| File               | Purpose                       |
| ------------------ | ----------------------------- |
| `.env`             | Shared / base settings        |
| `.env.development` | Development-only settings     |
| `.env.production`  | Production-only settings      |

## Project Structure

```
src/
├── app/          # Redux store & hooks
├── components/   # Shared UI (Button, Input, Modal, Loader, DataTable, ImageUpload, Layout)
├── features/     # Feature modules (auth, dashboard, htmlChunk, users, settings)
├── layouts/      # MainLayout, AuthLayout, DashboardLayout
├── pages/        # Home, NotFound, Unauthorized
├── routes/       # Router config, PrivateRoute, PublicRoute
├── styles/       # globals.css, variables.css, reset.css
├── types/        # Shared types
└── utils/        # Constants, helpers, validators, storage, date, permissions
```

