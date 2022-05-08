import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Collective from "../views/Collective.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/collective",
    name: "Collective",
    component: Collective,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from) => {
  if (!localStorage.getItem("token") && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
