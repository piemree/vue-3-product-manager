import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import axios from "./plugins/axios";
const app = createApp(App);

const pinia = createPinia();
pinia.use(axios);
app.use(pinia);
app.use(router);
app.mount("#app");
