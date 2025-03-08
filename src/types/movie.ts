export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  type: 'movie' | 'series';
  genre: string[];
  year: number;
  rating: string;
  isTrending: boolean;
  isOriginal: boolean;
}