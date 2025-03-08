<template>
  <header class="app-header">
    <div class="header-content">
      <div class="left-section">
        <router-link to="/" class="logo">
          <img src="@/assets/images/netflix-logo.png" alt="Netflix" class="netflix-logo" />
        </router-link>
        <nav class="main-nav">
          <router-link to="/">Home</router-link>
          <router-link to="/browse">TV Shows</router-link>
          <router-link to="/browse">Movies</router-link>
          <router-link to="/browse?filter=new">New & Popular</router-link>
          <router-link to="/my-list">My List</router-link>
        </nav>
      </div>
      <div class="right-section">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Titles, people, genres" 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            🔍
          </button>
        </div>
        <div class="user-profile">
          <span class="profile-icon">👤</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const router = useRouter();
const movieStore = useMovieStore();
const searchQuery = ref<string>('');

const handleSearch = (): void => {
  if (searchQuery.value.trim()) {
    movieStore.searchMovies(searchQuery.value);
    router.push('/search');
  }
};
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  transition: background-color 0.3s;
  padding: 0.8rem 2rem;
  height: 80px; /* Fixed height for header */
}

.app-header.scrolled {
  background-color: #141414;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1800px;
  margin: 0 auto;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.netflix-logo {
  height: 60px;
  width: auto;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.main-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.9rem;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  color: white;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-container input {
  background-color: rgba(0, 0, 0, 0.75);
  border: 1px solid #333;
  color: white;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-radius: 4px;
  outline: none;
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
}

.user-profile {
  cursor: pointer;
}

.profile-icon {
  font-size: 1.5rem;
}
</style>