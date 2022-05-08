<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useProductStore } from "../store/product";
import jsPDF from "jspdf";
import "jspdf-autotable";
import StockTable from "../components/tables/StockTable.vue";

const productStore = useProductStore();
const { products, tableProducts, productSum } = storeToRefs(productStore);
let selectedProduct = ref("sec");
const count = ref(0);
const tableRows = ref([]);
const doc = new jsPDF();

onMounted(() => productStore.fetchProducts());
const updateProducts = (increment) => {
  if (tableProducts.value.length === 0) return alert("Tabloda ürün yok!");
  let proceed = confirm("Ürünleri güncellemek istediğinize emin misiniz?");
  if (proceed) {
    productStore.updateProducts(increment);
  }
};
const addProductToTable = () => {
  if (selectedProduct.value === "sec") return alert("Bir ürün seçin!");
  if (count.value <= 0) return alert("Stok sayısı sıfırdan farklı olmalı!");
  productStore.addProductToTable(selectedProduct.value, count.value);
};

const downloadPdf = () => {
  if (tableProducts.value.length === 0) return alert("Tabloda ürün yok!");
  tableProducts.value.forEach((element) =>
    tableRows.value.push([element.name, element.count])
  );
  tableRows.value.push(["Toplam", productSum.value]);
  doc.text(
    "DM KIMYA",
    doc.internal.pageSize.width / 2,
    10,
    null,
    null,
    "center"
  );
  doc.text("Bilgilendirme Tablosu", 7, 30);
  doc.autoTable({
    startY: 40,
    margin: { horizontal: 7 },
    head: [["Urun adi", "Adet"]],
    body: tableRows.value,
  });

  doc.save("Test.pdf");
};
</script>

<template>
  <div class="container">
    <div class="flex flex-col md:flex-row gap-10 w-full justify-around">
      <div class="flex flex-col gap-5 flex-1">
        <div class="w-full">
          <select
            @change="(e) => (selectedProduct = e.target.value)"
            @focus="productStore.fetchProducts()"
            class="form-select w-full overflow-hidden block px-3 py-1.5 mb-5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option selected value="sec">Ürün seçin</option>
            <option v-for="(item, i) in products" :key="i" :value="item._id">
              {{ item.name }} ({{ item.stock }})
            </option>
          </select>
          <input
            v-model="count"
            class="w-full border outline-none px-4 py-2"
            type="number"
          />
        </div>
        <div class="flex gap-5">
          <button
            @click="addProductToTable"
            class="flex-1 py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Tabloya Ekle
          </button>
        </div>
      </div>
      <div class="stock-table-container flex-1 flex flex-col gap-5">
        <StockTable :data="tableProducts" :sum="productSum" />
        <div class="flex gap-5">
          <button
            @click="updateProducts(true)"
            class="flex-1 py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Stok Ekle
          </button>
          <button
            @click="updateProducts(false)"
            class="flex-1 py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Stok Düş
          </button>
        </div>
        <button
          @click="downloadPdf"
          class="flex-1 py-2 px-3 text-sm font-medium text-center text-red-600 hover:bg-red-100 border-2 rounded bg-inherit"
        >
          PDF indir
        </button>
      </div>
    </div>
  </div>
</template>
