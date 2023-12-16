<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const map = ref(null);
const lat = ref(0);
const lng = ref(0);

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;

        // Set the map view to the user's location
        map.value.setView([lat.value, lng.value], 15);

        // Fetch veterinary clinics based on user location
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

onMounted(() => {
  getLocation();
  map.value = L.map("mapContainer").setView([lat.value, lng.value], 5);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<template>
  <div>
    <h2>Nearby vets around you</h2>
    <div id="mapContainer"></div>
  </div>
</template>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
