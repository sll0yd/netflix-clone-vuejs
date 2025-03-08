import { defineStore } from 'pinia';
import { movies } from '@/data/movies';
import type { Movie } from '@/types/movie';

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
    movies: movies,
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
    setFeaturedMovie(): void {
      // Randomly select a trending movie for the banner
      const trendingMovies = this.movies.filter(movie => movie.isTrending);
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      this.featuredMovie = trendingMovies[randomIndex];
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
    
    searchMovies(query: string): void {
      this.searchQuery = query;
      if (!query.trim()) {
        this.filteredMovies = this.movies;
        return;
      }
      
      const searchTerm = query.toLowerCase();
      this.filteredMovies = this.movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) || 
        movie.description.toLowerCase().includes(searchTerm)
      );
    }
  }
});