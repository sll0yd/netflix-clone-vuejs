<template>
  <div class="home-view">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des films...</p>
    </div>
    
    <template v-else>
      <HeroBanner v-if="featuredMovie" :movie="featuredMovie" />
      
      <main class="content">
        <MovieRow title="Originals Netflix" :movies="originals" />
        <MovieRow title="Tendances" :movies="trending" />
        <MovieRow title="Tous les films" :movies="allMovies" />
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import HeroBanner from '@/components/movies/HeroBanner.vue';
import MovieRow from '@/components/movies/MovieRow.vue';

const movieStore = useMovieStore();

const loading = computed(() => movieStore.loading);
const featuredMovie = computed(() => movieStore.featuredMovie);
const originals = computed(() => movieStore.netflixOriginals);
const trending = computed(() => movieStore.trendingMovies);
const allMovies = computed(() => movieStore.movies);

onMounted(async () => {
  await movieStore.fetchAllMovies();
});
</script>

<style scoped>
.home-view {
  background-color: #141414;
  min-height: 100vh;
  color: white;
}

.content {
  padding-top: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141414;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #e50914;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>