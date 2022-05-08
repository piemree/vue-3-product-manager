import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    product: null,
    tableProducts: [],
    errorMessage: "",
  }),
  getters: {
    productSum: (state) =>
      state.tableProducts.reduce(
        (partialSum, a) => partialSum + Number(a.count),
        0
      ),
  },
  actions: {
    updateProducts(increment) {
      const products = this.$state.tableProducts;
      this.$axios
        .patch("/product", { products, increment })
        .then((response) => {
          this.$state.products = response.data;
        })
        .catch((error) => {
          this.$state.errorMessage = error.response.data.message;
        });
    },
    addProduct(payload) {
      this.$axios
        .post("/product", payload)
        .then((result) => {
          this.$state.products.push(result.data);
        })
        .catch((error) => {
          this.$state.errorMessage = error.response.data.message;
        });
    },
    deleteProduct(id) {
      this.$axios
        .delete(`/product/${id}`)
        .then((result) => {
          this.$state.products = this.$state.products.filter(
            (product) => product._id !== result.data._id
          );
        })
        .catch((error) =>  this.$state.errorMessage = error.response.data.message);
    },
    addProductToTable(productId, count) {
      const selectedProduct = this.$state.products.find(
        (p) => p._id === productId
      );
      this.$state.tableProducts.push({ ...selectedProduct, count });
    },
    deleteProductFromTable(index) {
      this.$state.tableProducts.splice(index, 1);
    },
    fetchProducts() {
      this.$axios
        .get("/product")
        .then((response) => {
          this.$state.products = response.data;
        })
        .catch((error) => {
          this.$state.errorMessage = error.response.data.message;
        });
    },
  },
});
