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
const user = ref({});
const showEditForm = ref(false);
const editUser = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  // Add other fields as needed
});




onMounted( () => {
        console.log(props.id)
        fetchUserDetails();
    } );

async function fetchUserDetails() {
  try {
    const { data } = await useApiPrivate().get(`/users/${props.id}`);
    console.log(data);
    user.value = data;
    editUser.value = { ...data };
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw error;
  }
}

function toggleEditForm() {
  showEditForm.value = !showEditForm.value;
}

async function updateUser() {
  try {
    const { data } = await useApiPrivate().patch(`/users/${props.id}`, editUser.value);
    user.value = data;
    toggleEditForm(); // Hide the edit form after updating
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
}

async function confirmDelete() {
  const isConfirmed = window.confirm('Are you sure you want to delete this user?');

  if (isConfirmed) {
    await deleteUser();
  }
}

async function deleteUser() {
  try {
    await useApiPrivate().delete(`/users/${props.id}`);
    router.go(-1);
  } catch (error) {
    console.error('Error deleting user:', error.message);
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
      <button @click="toggleEditForm">Edit</button>
      <div v-if="showEditForm">
        <h3>Edit User</h3>
        <form @submit.prevent="updateUser">
          <label for="editUsername">Username:</label>
          <input v-model="editUser.username" id="editUsername" required>

          <label for="editEmail">Email:</label>
          <input v-model="editUser.email" id="editEmail" required>

          <label for="editFirstName">First Name:</label>
          <input v-model="editUser.first_name" id="editFirstName">

          <label for="editLastName">Last Name:</label>
          <input v-model="editUser.last_name" id="editLastName">

          <!-- Add other input fields as needed -->

          <button type="submit">Update</button>
        </form>
      </div>
      <button @click="confirmDelete">Delete</button>
    </div>
    <div v-else>
      Loading user details...
    </div>
  </div>
</template>
