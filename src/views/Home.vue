<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import Product from "../components/cards/Product.vue";
import { useProductStore } from "../store/product";
import StockUpdate from "../components/modals/StockUpdate.vue";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const show = ref(false);
const filter = ref("");
const filteredProducts = computed(() =>
  products.value
    .filter((product) => product.name.toLowerCase().includes(filter.value.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
);

onMounted(() => productStore.fetchProducts());
</script>

<template>
  <div class="container">
    <div class="py-5 flex justify-center gap-3">
      <div class="input-wrapper">
        <input
          v-model="filter"
          class="py-3 px-2 border outline-none w-full h-full"
          type="text"
          placeholder="Arama"
        />
      </div>
      <div class="flex-1 flex justify-end">
        <button
          class="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 whitespace-nowrap"
          @click="show = true"
        >
          Ürün Ekle
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-7">
      <div v-for="(data, index) in filteredProducts" :key="index">
        <Product :data="data" />
      </div>
    </div>
  </div>
  <StockUpdate v-show="show" @hidemodal="show = false" />
</template>

<style lang="scss" scoped>
.input-wrapper {
  flex: 3;
  @media screen and (min-width: 768px) {
    flex: 1;
  }
}
</style>
