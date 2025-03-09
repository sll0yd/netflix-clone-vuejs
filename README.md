# Netflix Clone with Vue.js and TypeScript

A responsive Netflix clone built with Vue 3, TypeScript, and The Movie Database (TMDB) API.

**Live Demo:** [https://sll0yd.github.io/netflix-clone-vuejs](https://sll0yd.github.io/netflix-clone-vuejs)

## Features

- Responsive design that mimics Netflix's user interface
- Dynamic content from TMDB API
- Movie/TV show browsing by different categories and genres
- Detailed movie/show information pages
- Search functionality
- Auto-rotating featured content in hero banner
- Smooth transitions and animations

## Technologies Used

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia (State Management)
- TMDB API
- CSS (with responsive design)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/sll0yd/netflix-clone-vuejs.git
   cd netflix-clone-vuejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```
   (You can get an API key by creating an account at [themoviedb.org](https://www.themoviedb.org/))

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed.

## Project Structure

- `src/components` - Reusable Vue components
  - `common` - Shared UI components
  - `layout` - Header, footer components
  - `movies` - Movie-related components
- `src/views` - Page components
- `src/router` - Vue Router configuration
- `src/stores` - Pinia stores
- `src/services` - API services
- `src/types` - TypeScript type definitions
- `src/assets` - Static assets

## Key Components

- **AppHeader** - Main navigation and search
- **HeroBanner** - Featured content display with auto-rotation
- **MovieRow** - Horizontal scrollable movie lists
- **MovieDetailsView** - Detailed information about a movie/show

## Future Improvements

- User authentication
- My List functionality (favorites)
- Video playback integration
- User profiles
- Responsive refinements for mobile devices
- End-to-end testing

## Credits

- [Vue.js](https://vuejs.org/)
- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Netflix](https://www.netflix.com/) for the design inspiration

## License

This project is for educational purposes only. All Netflix branding, logos, and content are property of Netflix Inc.

---

*This is not the official Netflix product. This is a personal project built for learning purposes.*
