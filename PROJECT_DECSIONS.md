# Project Decisions

## UI
- Multi-page application (not SPA).
- Mobile navigation uses a hamburger menu.
- Desktop navigation uses inline links.
- Search bar is integrated into the hero section.
- One reusable Movie Card component across the application.
- Theme toggle supports Light/Dark mode and persists using Local Storage.
- Browse Movies initially displays 4 movies with a "View More" button.

## Architecture
- API responses are transformed into our own Movie model.
- Local Storage manages Watchlist, Favorites, Theme, and Recently Viewed.
- One responsibility per JavaScript module.