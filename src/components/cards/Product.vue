<script setup>
import { ref } from "vue";
import { useProductStore } from "../../store/product";
const productStore = useProductStore();
const props = defineProps({
  data: Object,
});

const deleteProduct = () => {
  let proceed = confirm(
    `${props.data.name} adlı ürünü silmek istediğinize emin misiniz?`
  );
  if (proceed) {
    productStore.deleteProduct(props.data._id);
  }
};
</script>
<template>
  <div class="p-6 bg-white rounded-lg border border-gray-200 flex flex-col items-center">
    <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900">
      {{ data.name }}
    </h5>

    <div class="mb-3">
      <span class="text-lg font-bold tracking-tight text-gray-900">stok: </span>
      <span> {{ data.stock }}</span>
    </div>
    <button
      @click="deleteProduct"
      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800"
    >
      Ürünü Sil
    </button>
  </div>
</template>

<style lang="scss"></style>
