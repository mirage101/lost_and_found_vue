<script setup>
import { ref, onMounted } from 'vue';
import { useApiPrivate } from "../../../composables/useApi";
import { useRouter } from 'vue-router';

const users = ref([]);
const router = useRouter();

onMounted(async () => {
  await fetchUsers();
});

async function fetchUsers() {
  try {
    const { data: fetchedUsers } = await useApiPrivate().get('/users');
    users.value = fetchedUsers;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
}

function goToUserDetails(userId) {
  router.push({ name: 'admin-user-detail', params: { id: userId } });
}

async function deleteUser(userId) {
  try {
    await useApiPrivate().delete(`/users/${userId}`);
    await fetchUsers(); // Refresh the user list after deletion
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
}

function goToCreateUser() {
  router.push({ name: 'admin-create-user' });
}
</script>

<template>
  <div>
    <h2>Users List</h2>

    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.username }}
        <button @click="() => goToUserDetails(user._id)">Details</button>
        <button @click="() => deleteUser(user._id)">Delete</button>
      </li>
    </ul>

    <button @click="goToCreateUser">Create User</button>
  </div>
</template>
