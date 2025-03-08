<template>
  <div class="browse-view">
    <h1 class="title">Browse Movies & TV Shows</h1>
    
    <div class="genre-filter">
      <button 
        v-for="genre in allGenres" 
        :key="genre"
        @click="filterByGenre(genre)"
        :class="{ active: currentGenre === genre }"
        class="genre-button"
      >
        {{ genre }}
      </button>
    </div>
    
    <div class="browse-content">
      <MovieRow title="All Content" :movies="filteredMovies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import MovieRow from '@/components/movies/MovieRow.vue';

const movieStore = useMovieStore();
const currentGenre = ref<string>('All');

const allGenres = computed(() => ['All', ...movieStore.allGenres]);
const filteredMovies = computed(() => movieStore.filteredMovies);

onMounted(() => {
  movieStore.filterMoviesByGenre('All');
});

const filterByGenre = (genre: string): void => {
  currentGenre.value = genre;
  movieStore.filterMoviesByGenre(genre);
};
</script>

<style scoped>
.browse-view {
  background-color: #141414;
  min-height: 100vh;
  color: white;
  padding: 80px 2rem 2rem;
}

.title {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.genre-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.genre-button {
  background-color: rgba(51, 51, 51, 0.7);
  border: none;
  color: #aaa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.genre-button:hover {
  background-color: rgba(51, 51, 51, 1);
  color: white;
}

.genre-button.active {
  background-color: #e50914;
  color: white;
}

.browse-content {
  margin-top: 2rem;
}
</style>