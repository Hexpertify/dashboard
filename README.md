<<<<<<< HEAD
# Dashboard

A modern, type-safe React dashboard template built with React 18, TypeScript, Redux Toolkit, Tailwind CSS, and Vite.

## Features

- **React 18** with TypeScript for type safety
- **Redux Toolkit** for state management with typed hooks
- **Tailwind CSS** for styling with dark mode support
- **React Router v6** for routing with protected routes
- **Vite** for fast development and building
- **ESLint** with TypeScript and React plugins
- **Component Library**: Buttons, Forms, Tables, Modals, Loaders
- **Authentication**: Login, Register, Forgot Password
- **Dashboard**: Overview, Analytics, Users management
- **Settings**: Profile, Account, Preferences, SEO Settings
- **Responsive Design**: Mobile-first approach with sidebar navigation
=======
# SEO Settings Dashboard

A React-based admin dashboard for managing page-level SEO metadata including meta tags, Open Graph data, and social media previews. Works fully offline with localStorage fallback.

## Features

- **Meta Tag Management** — Meta Title (max 60 chars), Meta Description (max 160 chars), Meta Keywords, Canonical URL
- **Auto URL Generation** — Canonical URL auto-generates from the Meta Title as you type (stops if you manually edit the URL)
- **Open Graph Settings** — OG Title, OG Description, OG Alt Text, OG Image (upload or paste URL)
- **Image Uploader** — Upload images from your device (preview as base64) or paste an image URL; remove with one click
- **Robots Indexing** — Choose between Index / No Index
- **Live Preview** — Real-time Google Search preview and Social Media (Facebook/LinkedIn) preview with image
- **Character Counters** — Live character count with color warnings (orange near limit, red over limit)
- **Form Validation** — Yup schema validation with inline error messages
- **Saved Pages Library** — All saved entries listed with title and date; click to edit, delete, or add new
- **Form Reset After Save** — Form clears after successful save so you can immediately enter new data
- **Offline Mode** — No backend required; all data persists in localStorage with an "Offline Mode" badge
- **Colorful UI** — Gradient header (blue → indigo → purple), tinted section cards, emerald accent on preview

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool / dev server |
| Material UI (MUI) 5 | Component library |
| Tailwind CSS 3 | Utility-first styling |
| Redux Toolkit | State management |
| Formik | Form state & validation |
| Yup | Schema validation |
| Axios | HTTP client (with 15s timeout) |
| react-hot-toast | Toast notifications |
>>>>>>> 441331a878018850586e807c35562f0331c2dc7b

## Project Structure

```
src/
<<<<<<< HEAD
├── app/              # Redux store and hooks
├── assets/           # Static assets (fonts, icons, images)
├── components/       # Shared UI components
│   ├── Button/
│   ├── Input/
│   ├── DataTable/
│   ├── Loader/
│   ├── Modal/
│   └── Layout/
├── features/         # Feature-based modules
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   └── settings/
├── layouts/          # Layout components
├── pages/            # Page components
├── routes/           # Routing configuration
├── styles/           # Global styles
├── types/            # TypeScript types
├── utils/            # Utility functions
├── App.tsx
├── main.tsx
└── vite-env.d.ts
=======
├── api/
│   └── seoApi.js            # Backend API calls (GET/POST/PUT/DELETE)
├── components/
│   ├── CharacterCounter.jsx  # Character count display with color warnings
│   ├── LivePreview.jsx       # Google & social media live preview
│   ├── SavedEntriesList.jsx  # Saved pages library with edit/delete
│   └── SEOForm.jsx           # Main SEO form with all fields
├── pages/
│   └── SEOSettings.jsx       # Page layout with gradient header
├── redux/
│   ├── seoSlice.js           # Redux slice with async thunks
│   └── store.js              # Redux store configuration
├── services/
│   ├── axiosInstance.js      # Axios config (baseURL, timeout, interceptors)
│   └── localStorageService.js # localStorage CRUD operations
├── validation/
│   └── seoValidation.js      # Yup validation schema
├── App.jsx                   # Root component with Toaster
├── index.css                 # Tailwind directives
└── main.jsx                  # Entry point with providers
>>>>>>> 441331a878018850586e807c35562f0331c2dc7b
```

## Getting Started

### Prerequisites
<<<<<<< HEAD

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at http://localhost:3000

### Building

```bash
npm run build
```

Creates a production build in the `dist` directory

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Features Overview

### Authentication
- Login / Register / Forgot Password pages
- JWT token management
- Protected routes

### Dashboard
- Overview with statistics
- Analytics charts
- User management (CRUD)

### Settings
- Profile management
- Account settings (password change, 2FA)
- Preferences (theme, language, notifications)
- SEO Settings with real-time Open Graph preview

### UI Components
- PrimaryButton with variants and loading states
- TextInput with validation
- DataTable with sorting, pagination, selection
- Modal with portal rendering
- Loader components
- Theme switcher (light/dark/system)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | API base URL | http://localhost:4000/api |
| VITE_APP_TITLE | Application title | Dashboard |

## License

MIT
=======
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

>>>>>>> 441331a878018850586e807c35562f0331c2dc7b
