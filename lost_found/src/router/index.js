import { useAuthStore } from "../stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Vets from "../views/Vets.vue";
import Advices from "../views/Advices.vue";
import Mission from "../views/Mission.vue";
import Lost from "../views/Lost.vue";
import Found from "../views/Found.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    { path: "/vets", component: Vets },
    { path: "/advices", component: Advices },
    { path: "/mission", component: Mission },
    { path: "/lost", component: Lost },
    { path: "/found", component: Found },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/auth/User.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: "home" });
  } else {
    return next();
  }
});

export default router;
