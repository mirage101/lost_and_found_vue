<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">
            {{ errorMessage }}
          </p>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="registerData.username"
              type="text"
              class="form-control"
              id="username"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input
              v-model="registerData.first_name"
              type="text"
              class="form-control"
              id="first_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input
              v-model="registerData.last_name"
              type="text"
              class="form-control"
              id="last_name"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="registerData.email"
              type="email"
              class="form-control"
              id="email"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="registerData.password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label"
              >Confirm Password</label
            >
            <input
              v-model="registerData.password_confirm"
              type="password"
              class="form-control"
              id="password_confirm"
            />
          </div>
          <input
            type="hidden"
            id="admin"
            v-model="registerData.admin"
            class="form-control"
          />
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useAuthStore } from "../../stores/auth";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const registerData = reactive({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_confirm: "",
  admin: "false", //user default
});

const errorMessage = ref("");

async function submit() {
  console.log(registerData);
  try {
    // Register the user
    await authStore.register(registerData);

    // Log in the user with the same credentials
    await authStore.login({
      email: registerData.email,
      password: registerData.password,
    });

    // Redirect to the home page after successful registration and login
    router.replace({ name: "home" });
  } catch (err) {
    errorMessage.value = err.message;
  }
  // await authStore
  //   .register(registerData)
  //   .then((res) => {
  //     router.replace({ name: "home" });
  //   })
  //   .catch((err) => {
  //     errorMessage.value = err.message;
  //   });
}
</script>
  
  <style scoped>
#register .card {
  max-width: 40vw;
  margin: auto;
}
</style>