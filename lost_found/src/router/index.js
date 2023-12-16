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
    {
      path: "/admin",
      component: () => import("../views/admin/Dashboard.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "", // Default child route (e.g., /admin)
          name: "admin",
          component: () => import("../views/admin/Dashboard.vue"),
        },
        {
          path: "advices", // /admin/advices
          name: "admin-advices",
          component: () => import("../views/admin/Advices.vue"),
        },
        {
          path: "pets", // /admin/pets
          name: "admin-pets",
          component: () => import("../views/admin/Pets.vue"),
        },
        {
          path: "users", // /admin/users
          name: "admin-users",
          component: () => import("../views/admin/users/Users.vue"),
        },
        {
          path: "users/:id",
          component: () => import("../views/admin/users/UserDetail.vue"),
          name: "admin-user-detail",
        },
        {
          path: "users/create",
          component: () => import("../views/admin/users/UserForm.vue"),
          name: "admin-user-create",
        },
        {
          path: "users/:id/edit",
          component: () => import("../views/admin/users/UserForm.vue"),
          name: "admin-user-edit",
        },
        {
          path: "users/:id/delete",
          component: () => import("../views/admin/users/UserDelete.vue"),
          name: "admin-user-delete",
        },
      ],
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();

  console.log('to.meta.requiresAuth:', to.meta.requiresAuth);
  console.log('to.meta.requiresAdmin:', to.meta.requiresAdmin);
  console.log('authStore.isAuthenticated:', authStore.isAuthenticated);
  console.log('authStore.isAdmin:', authStore.isAdmin);


  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Requires authentication, redirecting to login');
    return next({ name: "login", query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log('Requires guest, redirecting to home');
    return next({ name: "home" });
  } else if (to.meta.requiresAuth && to.meta.requiresAdmin && !authStore.isAdmin) {
    console.log('Requires authentication and admin, but user is not admin, redirecting to home');
    return next({ name: "admin" });
  } else {
    console.log('Proceeding to the route');
    return next();
  }
});

export default router;
