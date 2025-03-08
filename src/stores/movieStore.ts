// src/stores/movieStore.ts
import { defineStore } from 'pinia';
import type { Movie } from '@/types/movie';
import { tmdbService } from '@/services/tmdbService';

interface MovieState {
  movies: Movie[];
  featuredMovie: Movie | null;
  filteredMovies: Movie[];
  genres: string[];
  loading: boolean;
  searchQuery: string;
}

export const useMovieStore = defineStore('movies', {
  state: (): MovieState => ({
    movies: [],
    featuredMovie: null,
    filteredMovies: [],
    genres: [],
    loading: false,
    searchQuery: ''
  }),
  
  getters: {
    getMovieById: (state) => (id: number): Movie | undefined => {
      return state.movies.find(movie => movie.id === id);
    },
    trendingMovies: (state) => {
      return state.movies.filter(movie => movie.isTrending);
    },
    netflixOriginals: (state) => {
      return state.movies.filter(movie => movie.isOriginal);
    },
    allGenres: (state) => {
      const genreSet = new Set<string>();
      state.movies.forEach(movie => {
        movie.genre.forEach(g => genreSet.add(g));
      });
      return Array.from(genreSet);
    }
  },
  
  actions: {
    async fetchAllMovies(): Promise<void> {
      this.loading = true;
      try {
        const [trending, originals] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getNetflixOriginals()
        ]);
        
        // Combine and remove duplicates
        const allMovies = [...trending];
        for (const original of originals) {
          if (!allMovies.some(m => m.id === original.id)) {
            allMovies.push(original);
          }
        }
        
        this.movies = allMovies;
        this.filteredMovies = allMovies;
        this.setFeaturedMovie();
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        this.loading = false;
      }
    },
    
    setFeaturedMovie(): void {
      // Sélectionnez aléatoirement un film tendance pour la bannière
      const trendingMovies = this.movies.filter(movie => movie.isTrending);
      if (trendingMovies.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        this.featuredMovie = trendingMovies[randomIndex];
      }
    },
    
    filterMoviesByGenre(genre: string): void {
      if (!genre || genre === 'All') {
        this.filteredMovies = this.movies;
      } else {
        this.filteredMovies = this.movies.filter(movie => 
          movie.genre.includes(genre)
        );
      }
    },
    
    async searchMovies(query: string): Promise<void> {
      this.loading = true;
      this.searchQuery = query;
      
      try {
        if (!query.trim()) {
          this.filteredMovies = this.movies;
          return;
        }
        
        const results = await tmdbService.searchMovies(query);
        this.filteredMovies = results;
      } catch (error) {
        console.error('Failed to search movies:', error);
        this.filteredMovies = [];
      } finally {
        this.loading = false;
      }
    }
  }
});