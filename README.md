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

## Project Structure

```
src/
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
```

## Getting Started

### Prerequisites

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