<template>
  <div class="hero-banner" :style="bannerStyle">
    <div class="banner-content">
      <h1 class="movie-title">{{ currentMovie.title }}</h1>
      <div class="movie-meta">
        <span class="year">{{ currentMovie.year }}</span>
        <span class="rating">{{ currentMovie.rating }}</span>
        <span v-for="genre in currentMovie.genre" :key="genre" class="genre">{{ genre }}</span>
      </div>
      <p class="movie-description">{{ currentMovie.description }}</p>
      <div class="banner-buttons">
        <button class="btn-play">
          <span class="icon">▶</span>
          Play
        </button>
        <button class="btn-more-info">
          <span class="icon">ℹ</span>
          More Info
        </button>
      </div>
    </div>
    <div class="banner-fade"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import type { Movie } from '@/types/movie';

const movieStore = useMovieStore();
const currentIndex = ref(0);
const intervalId = ref<number | null>(null);

// Get the top 10 trending movies
const trendingMovies = computed(() => {
  return movieStore.trendingMovies.slice(0, 10);
});

// Current movie to display
const currentMovie = computed(() => {
  if (trendingMovies.value.length === 0) {
    // Fall back to the provided movie prop if no trending movies available
    return props.movie;
  }
  return trendingMovies.value[currentIndex.value];
});

// We'll still keep the movie prop for initial rendering
const props = defineProps<{
  movie: Movie;
}>();

// Banner background style with transition
const bannerStyle = computed(() => {
  const movie = currentMovie.value;
  return {
    backgroundImage: `url(${movie.bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    transition: 'background-image 1s ease-in-out'
  };
});

// Function to cycle to the next movie
const cycleMovie = () => {
  if (trendingMovies.value.length <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % trendingMovies.value.length;
};

// Set up the interval when the component mounts
onMounted(() => {
  // Cycle every 5 seconds (5000ms)
  intervalId.value = window.setInterval(cycleMovie, 5000);
});

// Clean up the interval when the component unmounts
onBeforeUnmount(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
});

// Reset the index if the trending movies list changes
watch(trendingMovies, () => {
  currentIndex.value = 0;
});
</script>

<style scoped>
.hero-banner {
  height: 80vh;
  position: relative;
  color: white;
  padding-top: 80px; /* Added padding equal to header height */
}

.banner-content {
  position: absolute;
  left: 5%;
  bottom: 35%;
  width: 40%;
  z-index: 5; /* Lower than header's z-index */
  transition: opacity 0.5s ease-in-out;
}

.movie-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Added text shadow for better visibility */
}

.movie-meta {
  display: flex;
  flex-wrap: wrap; /* Added to handle many genres */
  gap: 1rem;
  margin-bottom: 1rem;
}

.genre {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.movie-description {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  max-height: 7.5em; /* Limit to about 5 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5; /* Standard property for compatibility */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.banner-buttons {
  display: flex;
  gap: 1rem;
}

.banner-buttons button {
  padding: 0.7rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-play {
  background-color: white;
  color: black;
  border: none;
}

.btn-play:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.btn-more-info {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: none;
}

.btn-more-info:hover {
  background-color: rgba(109, 109, 110, 0.5);
}

.banner-fade {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background-image: linear-gradient(
    to bottom,
    transparent,
    rgba(20, 20, 20, 1)
  );
}

@media (max-width: 768px) {
  .banner-content {
    width: 70%;
  }
  
  .movie-title {
    font-size: 2rem;
  }
}
</style>