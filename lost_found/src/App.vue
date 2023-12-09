<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Set minimum height of the container to at least 100% of the viewport height */
  margin: 0; /* Remove default margin */
}

main {
  flex: 1; /* Allow the main content to take up remaining space */
}
</style>
