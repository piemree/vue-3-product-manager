<script setup>
import Navigation from "./components/Navigation.vue";
import { useProductStore } from "./store/product";
import ErrorAlert from "./components/alerts/ErrorAlert.vue";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { errorMessage } = storeToRefs(productStore);
const resetErrors = () => {
  productStore.$state.errorMessage = "";
};
</script>

<template>
  <Navigation />
  <ErrorAlert
    v-if="errorMessage"
    :message="errorMessage"
    @hidemodal="resetErrors"
  />
  <router-view />
</template>

<style lang="scss"></style>
