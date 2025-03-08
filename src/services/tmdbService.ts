// src/services/tmdbService.ts
import axios from 'axios';
import type { Movie } from '@/types/movie';

const API_KEY = '02c8bde36cdfb534af35f7b142a1b68d'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  genre_ids: number[];
  release_date?: string;
  first_air_date?: string;
  adult: boolean;
}

interface GenreResponse {
  genres: { id: number; name: string }[];
}

export const tmdbService = {
  // Récupérer les genres
  async getGenres() {
    const [movieGenres, tvGenres] = await Promise.all([
      axios.get<GenreResponse>(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`),
      axios.get<GenreResponse>(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=fr-FR`)
    ]);
    
    // Combine movie and TV genres
    const genreMap = new Map();
    [...movieGenres.data.genres, ...tvGenres.data.genres].forEach(genre => {
      genreMap.set(genre.id, genre.name);
    });
    
    return genreMap;
  },
  
  // Récupérer les contenus tendance
  async getTrending(): Promise<Movie[]> {
    const response = await axios.get<{ results: TMDBResult[] }>(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=fr-FR`);
    const genreMap = await this.getGenres();
    return this.formatResults(response.data.results, genreMap);
  },
  
  // Récupérer les Originals Netflix (on utilise les séries populaires comme proxy)
  async getNetflixOriginals(): Promise<Movie[]> {
    const response = await axios.get<{ results: TMDBResult[] }>(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const genreMap = await this.getGenres();
    return this.formatResults(response.data.results, genreMap, true);
  },
  
  // Rechercher des films ou séries
  async searchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get<{ results: TMDBResult[] }>(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`);
    const genreMap = await this.getGenres();
    return this.formatResults(response.data.results, genreMap);
  },
  
  // Formatter les résultats pour correspondre à notre type Movie
  formatResults(results: TMDBResult[], genreMap: Map<number, string>, isOriginal = false): Movie[] {
    return results
      .filter(item => item.poster_path && item.backdrop_path)
      .map(item => {
        const genreNames = item.genre_ids.map(id => genreMap.get(id) || '').filter(Boolean);
        
        return {
          id: item.id,
          title: item.title || item.name || 'Titre inconnu',
          description: item.overview || 'Aucune description disponible',
          posterUrl: `${IMAGE_BASE_URL}/w500${item.poster_path}`,
          bannerUrl: `${IMAGE_BASE_URL}/original${item.backdrop_path}`,
          type: item.media_type === 'movie' ? 'movie' : 'series',
          genre: genreNames,
          year: new Date(item.release_date || item.first_air_date || '').getFullYear() || 2023,
          rating: item.adult ? '18+' : '13+',
          isTrending: true,
          isOriginal: isOriginal
        };
      });
  }
};