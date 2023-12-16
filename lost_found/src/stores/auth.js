import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      accessToken: "",
      authReady: false,
    };
  },

  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => (state.accessToken ? true : false),
    //isAdmin: (state) => state.user?.role === "admin", // Check if the user is an admin
    isAdmin: (state) => (state.user && state.user.admin === 'true')
  },

  actions: {
    async attempt() {
      try {
        await this.refresh();
        await this.getUser();
      } catch (error) {
        return;
      }
    },

    async login(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token;
        await this.getUser();
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async register(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/register`, payload);
        console.log("successfully registered");
        return data;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new Error("Username or email is already taken. Please choose another one.");
        } else {
          throw new Error("Registration failed. Please try again later.");
        }
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/user`);
        this.user = data;
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = "";
        this.user = {};
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data.access_token;
        return data;
      } catch (error) {
        throw error.message;
      }
    },
  },
});

export const useUsersStore = defineStore("users", {
  state: () => ({
    userList: [],
    selectedUser: null,
  }),

  actions: {
    async fetchUsers() {
      try {
        const { data } = await useApiPrivate().get('/users'); // Adjust the API endpoint
        this.userList = data;
        console.log('data: ', data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error; // Propagate the error to the calling component
      }
    },

    async createUser(userData) {
      try {
        const { data } = await useApiPrivate().post('/api/users', userData); // Adjust the API endpoint
        this.userList.push(data); // Update state with the newly created user
      } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
      }
    },

    async updateUser(userId, userData) {
      try {
        const { data } = await useApiPrivate().patch(`/api/users/${userId}`, userData); // Adjust the API endpoint
        const index = this.userList.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.userList[index] = data; // Update state with the modified user
        }
      } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
      }
    },

    async deleteUser(userId) {
      try {
        await useApiPrivate().delete(`/api/users/${userId}`); // Adjust the API endpoint
        this.userList = this.userList.filter(user => user.id !== userId); // Update state by removing the deleted user
      } catch (error) {
        console.error('Error deleting user:', error.message);
        throw error;
      }
    },
  },
});