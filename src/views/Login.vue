<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";
import { useAuthStore } from "../store/auth";
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const user = ref({
  username: "",
  password: "",
});

async function login(params) {
  await authStore.loginUser(user.value);
  router.push("/");
}
</script>

<template>
  <div class="form-wrapper flex items-center justify-center">
    <form @submit.prevent="login" class="flex flex-col gap-5 p-5 border border-gray-400">
      <input v-model="user.username" type="text" class="border border-gray-400  p-2 outline-none" placeholder="kullanıcı adı" />
      <input v-model="user.password" type="password" class="border border-gray-400 p-2 outline-none"  placeholder="şifre"/>
      <button type="submit" class="bg-blue-600 text-white w-1/2 m-auto py-1">Giriş</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  height: calc(100vh - 72px);
}
</style>
