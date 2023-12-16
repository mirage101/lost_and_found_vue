<script setup>
import {  defineProps, onMounted, ref } from 'vue';
import { useApiPrivate } from "../../../composables/useApi";
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps( {
      id: {
        type: Number,
        required: true,
      },

    });
const mission = ref({});
const showEditForm = ref(false);
const editMission = ref({
  mission_content: '',
});




onMounted( () => {
        console.log(props.id)
        fetchMissionDetails();
    } );

async function fetchMissionDetails() {
  try {
    const { data } = await useApiPrivate().get(`/mission/${props.id}`);
    console.log(data);
    user.value = data;
    editMission.value = { ...data };
  } catch (error) {
    console.error('Error fetching mission details:', error.message);
    throw error;
  }
}

function toggleEditForm() {
  showEditForm.value = !showEditForm.value;
}

async function updateMission() {
  try {
    const { data } = await useApiPrivate().patch(`/mission/${props.id}`, editMission.value);
    mission.value = data;
    toggleEditForm(); // Hide the edit form after updating
  } catch (error) {
    console.error('Error updating mission:', error.message);
    throw error;
  }
}

async function confirmDelete() {
  const isConfirmed = window.confirm('Are you sure you want to delete this user?');

  if (isConfirmed) {
    await deleteMission();
  }
}

async function deleteMission() {
  try {
    await useApiPrivate().delete(`/mission/${props.id}`);
    router.go(-1);
  } catch (error) {
    console.error('Error deleting mission:', error.message);
    throw error;
  }
}
</script>

<template>
  <div>
    <h2>Mission Details</h2>

    <div v-if="mission">
      <p><strong>Mission content:</strong> {{ mission.mission_content }}</p>
      <!-- Add other user details as needed -->
      <button @click="toggleEditForm">Edit</button>
      <div v-if="showEditForm">
        <h3>Edit Mission</h3>
        <form @submit.prevent="updateMission">
          <label for="editUsername">Mission Content:</label>
          <input v-model="editMission.mission_content" id="editMission" required>

          <!-- Add other input fields as needed -->

          <button type="submit">Update</button>
        </form>
      </div>
      <button @click="confirmDelete">Delete</button>
    </div>
    <div v-else>
      Loading mission details...
    </div>
  </div>
</template>
