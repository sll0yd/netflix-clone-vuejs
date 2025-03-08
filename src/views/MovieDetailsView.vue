<template>
  <div class="movie-details" v-if="movie">
    <div class="banner" :style="bannerStyle">
      <div class="banner-content">
        <h1>{{ movie.title }}</h1>
        <div class="meta">
          <span class="year">{{ movie.year }}</span>
          <span class="rating">{{ movie.rating }}</span>
          <span class="type">{{ movie.type === 'series' ? 'Series' : 'Movie' }}</span>
        </div>
        
        <div class="actions">
          <button class="btn-play">
            <span class="icon">▶</span>
            Play
          </button>
          <button class="btn-add">
            <span class="icon">+</span>
            My List
          </button>
        </div>
        
        <div class="description">
          <p>{{ movie.description }}</p>
        </div>
        
        <div class="genres">
          <h3>Genres:</h3>
          <div class="genre-tags">
            <span v-for="genre in movie.genre" :key="genre" class="genre-tag">
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
      <div class="banner-fade"></div>
    </div>
    
    <div class="more-content">
      <h2>More Like This</h2>
      <div class="similar-movies">
        <div 
          v-for="similarMovie in similarMovies" 
          :key="similarMovie.id" 
          class="similar-movie-card"
          @click="navigateToMovie(similarMovie.id)"
        >
          <img :src="similarMovie.posterUrl" :alt="similarMovie.title" />
          <div class="similar-info">
            <h3>{{ similarMovie.title }}</h3>
            <p>{{ similarMovie.year }} | {{ similarMovie.rating }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
// import type { Movie } from '@/types/movie';

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

const movieId = computed(() => Number(route.params.id));
const movie = computed(() => movieStore.getMovieById(movieId.value));

const bannerStyle = computed(() => {
  if (!movie.value) return {};
  return {
    backgroundImage: `url(${movie.value.bannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top'
  };
});

const similarMovies = computed(() => {
  if (!movie.value) return [];
  return movieStore.movies
    .filter(m => 
      m.id !== movie.value!.id && 
      m.genre.some(g => movie.value!.genre.includes(g))
    )
    .slice(0, 6);
});

const navigateToMovie = (id: number): void => {
  if (id === movieId.value) return;
  router.push({ name: 'movie-details', params: { id: id.toString() } });
};
</script>

<style scoped>
.movie-details {
  background-color: #141414;
  color: white;
  min-height: 100vh;
}

.banner {
  height: 70vh;
  position: relative;
}

.banner-content {
  position: absolute;
  bottom: 25%;
  left: 4rem;
  width: 50%;
  z-index: 10;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.year, .rating, .type {
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.actions button {
  padding: 0.7rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-play {
  background-color: white;
  color: black;
  border: none;
}

.btn-add {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: none;
}

.description {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.genres h3 {
  margin-bottom: 0.5rem;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-size: 0.8rem;
}

.banner-fade {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-image: linear-gradient(
    to bottom,
    transparent,
    rgba(20, 20, 20, 1)
  );
}

.more-content {
  padding: 2rem 4rem;
}

.more-content h2 {
  margin-bottom: 1.5rem;
}

.similar-movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.similar-movie-card {
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 4px;
  overflow: hidden;
}

.similar-movie-card:hover {
  transform: scale(1.05);
}

.similar-movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.similar-info {
  padding: 0.8rem;
  background-color: #2a2a2a;
}

.similar-info h3 {
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

.similar-info p {
  font-size: 0.8rem;
  color: #aaa;
}

@media (max-width: 768px) {
  .banner-content {
    width: 80%;
    left: 2rem;
  }
  
  .banner-content h1 {
    font-size: 2rem;
  }
  
  .more-content {
    padding: 2rem;
  }
}
</style>