<template>
  <div class="movie-row">
    <h2 class="row-title">{{ title }}</h2>
    <div class="movie-slider">
      <div 
        v-for="movie in movies" 
        :key="movie.id"
        class="movie-card"
        @click="navigateToMovieDetails(movie.id)"
      >
        <img :src="movie.posterUrl" :alt="movie.title" class="movie-poster" />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p class="year-rating">{{ movie.year }} | {{ movie.rating }}</p>
          <p class="genres">{{ movie.genre.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Movie } from '@/types/movie';

// Define props without assigning to a variable
defineProps<{
  title: string;
  movies: Movie[];
}>();

const router = useRouter();

const navigateToMovieDetails = (id: number): void => {
  router.push({ name: 'movie-details', params: { id: id.toString() } });
};
</script>

<style scoped>
.movie-row {
  margin: 3rem 0;
}

.row-title {
  margin-left: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.movie-slider {
  display: flex;
  overflow-x: auto;
  padding: 0 2rem;
  gap: 1rem;
  scrollbar-width: none; /* For Firefox */
}

.movie-slider::-webkit-scrollbar {
  display: none;
}

.movie-card {
  flex: 0 0 auto;
  width: 230px;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.movie-card:hover {
  transform: scale(1.05);
  z-index: 10;
}

.movie-poster {
  width: 100%;
  height: 325px;
  object-fit: cover;
  border-radius: 4px;
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-info {
  transform: translateY(0);
}

.movie-info h3 {
  margin: 0 0 0.5rem;
  color: white;
  font-size: 1rem;
}

.year-rating, .genres {
  margin: 0.2rem 0;
  font-size: 0.8rem;
  color: #dddddd;
}
</style>