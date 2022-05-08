<script setup>
import { ref } from "vue";
import { useProductStore } from "../../store/product";
const productStore = useProductStore();
defineProps({
  state: Boolean,
  data: Object,
});
defineEmits("hidemodal");
let data = ref({ name: "", stock: 0 });
</script>

<template>
  <div
    @click.self="$emit('hidemodal')"
    id="defaultModal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 h-modal bg-black bg-opacity-50"
  >
    <div
      @click.self="$emit('hidemodal')"
      class="relative p-4 w-full max-w-2xl h-full md:h-full m-auto flex items-center justify-center"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg">
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Yeni Ürün
          </h3>
          <button
            @click="$emit('hidemodal')"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 flex justify-around gap-10">
          <div class="flex flex-col gap-3">
            <input
              v-model="data.name"
              class="border outline-none px-3 py-1 w-full"
              type="text"
              placeholder="ürün adı"
            />
            <input
              v-model="data.stock"
              class="border outline-none px-3 py-1 w-full"
              type="number"
              placeholder="mevcut stok"
            />
            <button
              @click="productStore.addProduct(data)"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Yeni Ürün Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
