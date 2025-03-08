<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  background-color: #141414;
  color: #fff;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* This helps push footer to bottom */
#app > :nth-child(2) {
  flex: 1;
}
</style>