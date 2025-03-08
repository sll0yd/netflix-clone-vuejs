<template>
  <div class="home-view">
    <HeroBanner v-if="featuredMovie" :movie="featuredMovie" />
    
    <main class="content">
      <MovieRow title="Netflix Originals" :movies="originals" />
      <MovieRow title="Trending Now" :movies="trending" />
      <MovieRow title="All Movies" :movies="allMovies" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import HeroBanner from '@/components/movies/HeroBanner.vue';
import MovieRow from '@/components/movies/MovieRow.vue';

const movieStore = useMovieStore();

const featuredMovie = computed(() => movieStore.featuredMovie);
const originals = computed(() => movieStore.netflixOriginals);
const trending = computed(() => movieStore.trendingMovies);
const allMovies = computed(() => movieStore.movies);

onMounted(() => {
  movieStore.setFeaturedMovie();
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
</style>