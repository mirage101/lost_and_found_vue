<script setup>
import { ref, onMounted } from 'vue';
import { useApiPrivate } from "../../../composables/useApi";
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref(router.params.id);
const user = ref(null);

console.log(userId)

onMounted(() => {
  // Fetch user details when the component is mounted
  fetchUserDetails();
});

async function fetchUserDetails() {
  try {
    const { data } = await useApiPrivate().get(`/users/${userId.value}`);
    user.value = data;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw error;
  }
}
</script>

<template>
  <div>
    <h2>User Details</h2>

    <div v-if="user">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>First Name:</strong> {{ user.first_name }}</p>
      <p><strong>Last Name:</strong> {{ user.last_name }}</p>
      <!-- Add other user details as needed -->
    </div>
    <div v-else>
      Loading user details...
    </div>
  </div>
</template>
