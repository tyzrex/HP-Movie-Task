### CineVault - Movie Discovery App

A modern, responsive movie discovery application built with Next.js 15 and TypeScript, featuring comprehensive movie browsing, search, and favorites functionality using the YTS Movie API.

## 🎯 Assignment Requirements Fulfilled

### ✅ Tech Stack Requirements

- **Framework**: Next.js 15 (React-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: YTS Movie API (`https://yts.mx/api`)


### ✅ Core Features Implemented

#### 1. Movie Listing Page

- ✅ Fetches and displays paginated list of movies
- ✅ Shows title, poster, year, and rating for each movie
- ✅ Displays 20 movies per page (configurable)
- ✅ Implements pagination controls (next/prev/numbered pages)
- ✅ Located at `/movies` route


#### 2. Movie Detail Page

- ✅ Dedicated detail page for each movie (`/movie/[id]`)
- ✅ Displays all required information:

- Full title
- Poster image
- Description/summary
- Genres (as badges)
- Rating (with star icon)
- Additional info: year, runtime, language, cast





#### 3. Search Functionality

- ✅ Search bar that filters movies by title
- ✅ Genre filter dropdown
- ✅ Advanced filters: rating, sort options
- ✅ Search with URL parameters


#### 4. Favorites System

- ✅ Toggle movies as "favorite" with heart icon
- ✅ Persists favorites in localStorage
- ✅ Dedicated `/favorites` route
- ✅ Real-time updates across components


#### 5. Responsive Design

- ✅ Mobile-first responsive design
- ✅ Optimized for mobile, tablet, and desktop
- ✅ Collapsible sidebar navigation
- ✅ Bottom navigation for mobile devices


#### 6. Loading and Error States

- ✅ Skeleton UI components
- ✅ Handles empty states and "not found" scenarios
- ✅ User-friendly error messages for API failures
- ✅ Error boundaries for graceful error handling


## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- Docker (optional for containerized deployment)
- Access to YTS Movie API (no API key required)

### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/tyzrex/HP-Movie-Task cinevault
cd cinevault
```


2. **Install dependencies**

```shellscript
pnpm install
```

3. **Configure environment variables**
Create a `.env.local` file in the root directory and add the following:

```plaintext
NEXT_PUBLIC_API_URL=https://yts.mx/api/v2
```
This is the base URL for the YTS Movie API. No API key is required.


4. **Run development server**

```shellscript
pnpm run dev
```


5. **Open in browser**

```plaintext
http://localhost:3000
```
OR

Use Docker:

```shellscript
docker build -t cinevault .
docker run -p 3000:3000 cinevault
```

5. **Build for production**

```shellscript
pnpm run build
pnpm start
```


## 📱 Features Overview

### 🎬 Movie Discovery

- **Home Page**: Featured movie hero section with categorized movie rows
- **Browse Page**: Advanced search and filtering capabilities
- **Movie Details**: Comprehensive movie information with similar recommendations


### ⭐ Favorites Management

- **Add/Remove**: One-click favorite toggling
- **Persistence**: Favorites saved in localStorage
- **Dedicated Page**: View all favorites at `/favorites`


### 🔍 Search & Filter

- **Text Search**: Search movies by title
- **Genre Filter**: Filter by movie genres
- **Rating Filter**: Minimum rating slider
- **Sort Options**: Sort by rating, year, title, popularity


### 📱 Responsive Design

- **Mobile**: Bottom navigation + collapsible sidebar
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full sidebar navigation


## 🏗️ Project Structure

```plaintext
cinevault/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Home page (/)
│   ├── movies/            # Movie listing (/movies)
│   ├── movie/[id]/        # Movie details (/movie/[id])
│   ├── favorites/         # Favorites page (/favorites)
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── movie-card.tsx    # Movie card component
│   ├── search-bar.tsx    # Search functionality
│   ├── pagination.tsx    # Pagination controls
│   └── ...
├── lib/                  # Utilities
│   ├── api.ts           # YTS API functions
│   ├── favorites.ts     # Favorites management
│   └── types.ts         # TypeScript definitions
└── public/              # Static assets
```

## 🔧 API Integration

### YTS Movie API Endpoints Used

- `GET /list_movies.json` - Movie listing with pagination
- `GET /movie_details.json` - Detailed movie information
- Search parameters: `query_term`, `genre`, `sort_by`, `order_by`


### Example API Usage

```typescript
// Fetch movies with pagination
const data = await fetchMovies({
  page: 1,
  limit: 20,
  query_term: "action",
  genre: "Action",
  sort_by: "rating"
});

// Fetch movie details
const movie = await fetchMovieDetails(movieId);
```

## 📋 Assignment Checklist

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with responsive design
- **Movie Listing**: Paginated list with 20 movies per page
- **Movie Details**: Complete movie information page
- **Search**: Title search and genre filtering
- **Favorites**: localStorage persistence with dedicated route
- **Responsive**: Mobile, tablet, desktop optimized
- **Loading States**: Skeleton UI and loading spinners
- **Error Handling**: User-friendly error messages
- **Navigation**: Proper routing between pages


## 🔗 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app)

