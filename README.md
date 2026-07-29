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

## Project Structure

```
src/
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
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. No backend server required — data saves to localStorage automatically.

### Build for Production

```bash
npm run build
npm run preview
```

## How It Works

### Data Flow
1. On page load, the app checks localStorage for saved entries and lists them
2. Select an existing entry to edit, or use "Add New" to start fresh
3. Fill in the form — Canonical URL auto-generates from the Title
4. Click **Save SEO** — data is saved to localStorage with a unique ID
5. Form resets to empty for the next entry
6. All saved entries appear in the **Saved Pages** list above the form

### Offline Mode
When the backend (`http://localhost:5000/api`) is unavailable, the app:
- Reads/writes all data to `localStorage` under the `seo_settings_` prefix
- Shows an "Offline Mode" badge in the header
- No console errors — failed API calls are suppressed

### Image Upload
- Click **Upload Image** to select a file from your device (converted to base64 data URL for preview)
- Or paste an image URL directly into the text field
- Click the red ✕ on the thumbnail to remove the image
- The Live Preview automatically updates with the uploaded image

## API Endpoints (for future backend)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/seo/:pageId` | Fetch SEO data |
| POST | `/api/seo` | Create SEO entry |
| PUT | `/api/seo/:id` | Update SEO entry |
| DELETE | `/api/seo/:id` | Delete SEO entry |

Configure the base URL in `src/services/axiosInstance.js`.
