<template>
  <div class="search-view">
    <div class="search-header">
      <h1>Search Results</h1>
      <p v-if="searchQuery">Results for: "{{ searchQuery }}"</p>
    </div>
    
    <div class="search-results" v-if="searchResults.length">
      <div 
        v-for="movie in searchResults" 
        :key="movie.id" 
        class="result-card"
        @click="navigateToMovie(movie.id)"
      >
        <img :src="movie.posterUrl" :alt="movie.title" />
        <div class="result-info">
          <h3>{{ movie.title }}</h3>
          <p class="meta">{{ movie.year }} | {{ movie.rating }}</p>
          <p class="genres">{{ movie.genre.join(', ') }}</p>
          <p class="description">{{ truncateDescription(movie.description) }}</p>
        </div>
      </div>
    </div>
    
    <div v-else class="no-results">
      <p>No results found. Try searching for something else.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
// import type { Movie } from '@/types/movie';

const router = useRouter();
const movieStore = useMovieStore();

const searchQuery = computed(() => movieStore.searchQuery);
const searchResults = computed(() => movieStore.filteredMovies);

const truncateDescription = (description: string): string => {
  if (description.length <= 150) return description;
  return description.substring(0, 150) + '...';
};

const navigateToMovie = (id: number): void => {
  router.push({ name: 'movie-details', params: { id: id.toString() } });
};
</script>

<style scoped>
.search-view {
  background-color: #141414;
  color: white;
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
}

.search-header {
  margin-bottom: 2rem;
}

.search-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.result-card {
  display: flex;
  background-color: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.result-card:hover {
  transform: scale(1.02);
}

.result-card img {
  width: 200px;
  height: 300px;
  object-fit: cover;
}

.result-info {
  padding: 1rem;
  flex: 1;
}

.result-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.meta, .genres {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #aaa;
}

.description {
  font-size: 1rem;
  line-height: 1.5;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #aaa;
}

@media (max-width: 768px) {
  .result-card {
    flex-direction: column;
  }
  
  .result-card img {
    width: 100%;
    height: 200px;
  }
}
</style>