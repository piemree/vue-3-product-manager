import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("token") ? true : false,
  }),
  actions: {
    async loginUser(user) {
      try {
        const response = await this.$axios.post("/auth/login", user);
        if (response.data?.token) {
          this.$state.isAuthenticated = true;
          localStorage.setItem("token", response.data?.token);
        }
      } catch (error) {
        console.log(error);
      }
    },
    logoutUser() {
      this.$state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
