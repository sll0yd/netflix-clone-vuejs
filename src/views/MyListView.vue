<template>
  <div class="my-list-view">
    <h1 class="title">My List</h1>
    
    <div v-if="myList.length" class="list-content">
      <div class="movie-grid">
        <div 
          v-for="movie in myList" 
          :key="movie.id"
          class="movie-card"
          @click="navigateToMovie(movie.id)"
        >
          <img :src="movie.posterUrl" :alt="movie.title" class="movie-poster" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.year }} | {{ movie.rating }}</p>
            <button class="remove-btn" @click.stop="removeFromList(movie.id)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-list">
      <p>Your list is empty. Add movies while browsing to see them here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const router = useRouter();
const movieStore = useMovieStore();

// For demonstration purposes, just show trending movies
// In a real app, you would have a separate list in the store
const myList = computed(() => movieStore.trendingMovies);

const navigateToMovie = (id: number): void => {
  router.push({ name: 'movie-details', params: { id: id.toString() } });
};

const removeFromList = (id: number): void => {
  // This would call a store action to remove from list
  // For now it's just a placeholder
  console.log('Removing movie with ID:', id);
};
</script>

<style scoped>
.my-list-view {
  background-color: #141414;
  min-height: 100vh;
  color: white;
  padding: 80px 2rem 2rem;
}

.title {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.movie-card {
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  transform: translateY(100%);
  transition: transform 0.3s;
}

.movie-card:hover .movie-info {
  transform: translateY(0);
}

.movie-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.remove-btn {
  margin-top: 0.5rem;
  background-color: rgba(229, 9, 20, 0.7);
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: rgb(229, 9, 20);
}

.empty-list {
  text-align: center;
  padding: 4rem;
  color: #aaa;
}
</style>