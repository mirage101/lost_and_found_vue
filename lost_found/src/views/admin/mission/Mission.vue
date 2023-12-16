<script setup>
import { ref, onMounted } from 'vue';
import { useApiPrivate } from "../../../composables/useApi";
import { useRouter } from 'vue-router';

const missions = ref([]);
const router = useRouter();

onMounted(async () => {
  await fetchMission();
});

async function fetchMission() {
  try {
    const { data: fetchedMission } = await useApiPrivate().get('/mission');
    missions.value = fetchedMission;
  } catch (error) {
    console.error('Error fetching mission:', error.message);
    throw error;
  }
}

function goToMissionDetails(missionId) {
  router.push({ name: 'admin-mission-detail', params: { id: missionId } });
}

async function deleteMission(missionId) {
  try {
    await useApiPrivate().delete(`/mission/${missionId}`);
    await fetchMission(); // Refresh the user list after deletion
  } catch (error) {
    console.error('Error deleting mission:', error.message);
    throw error;
  }
}

function goToCreateUser() {
  router.push({ name: 'admin-create-mission' });
}
</script>

<template>
  <div>
    <h2>Mission</h2>

    <ul>
      <li v-for="mission in missions" :key="mission._id">
        {{ mission.mission_content }}
        <button @click="() => goToMissionDetails(mission._id)">Details</button>
        <button @click="() => deleteMission(mission._id)">Delete</button>
      </li>
    </ul>

    <button @click="goToCreateUser">Create Mission</button>
  </div>
</template>
