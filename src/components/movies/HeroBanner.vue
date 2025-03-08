<template>
  <div class="hero-banner" :style="bannerStyle">
    <div class="banner-content">
      <h1 class="movie-title">{{ movie.title }}</h1>
      <div class="movie-meta">
        <span class="year">{{ movie.year }}</span>
        <span class="rating">{{ movie.rating }}</span>
        <span v-for="genre in movie.genre" :key="genre" class="genre">{{ genre }}</span>
      </div>
      <p class="movie-description">{{ movie.description }}</p>
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
import { computed } from 'vue';
import type { Movie } from '@/types/movie';

const props = defineProps<{
  movie: Movie;
}>();

const bannerStyle = computed(() => {
  return {
    backgroundImage: `url(${props.movie.bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top'
  };
});
</script>

<style scoped>
.hero-banner {
  height: 80vh;
  position: relative;
  color: white;
}

.banner-content {
  position: absolute;
  left: 5%;
  bottom: 35%;
  width: 40%;
  z-index: 10;
}

.movie-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.movie-description {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
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