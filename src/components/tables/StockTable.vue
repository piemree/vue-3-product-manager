<script setup>
import { useProductStore } from "../../store/product";

defineProps({
  data: Array,
  sum: Number,
});
const productStore = useProductStore();
const deleteProductFromTale = (index) => {
  let proceed = confirm("Ürünü tablodan silmek istediğinize emin misiniz?");
  if (proceed) {
    productStore.deleteProductFromTable(index);
  }
};
</script>
<template>
  <table class="border">
    <thead class="border text-sm">
      <th class="border py-5">Ad</th>
      <th class="border py-5">Adet</th>
    </thead>
    <tbody class="text-sm">
      <tr v-for="(item, index) in data" :key="index">
        <td class="border py-5 text-center">{{ item.name }}</td>
        <td class="border py-5 text-center">{{ item.count }}</td>
        <td class="border py-5 text-center">
          <button
            @click="deleteProductFromTale(index)"
            class="bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            sil
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th class="border py-5 text-center">Toplam</th>
        <th class="border py-5 text-center">{{ sum }}</th>
      </tr>
    </tfoot>
  </table>
</template>

<style lang=""></style>
