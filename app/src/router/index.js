import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "My Notes",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/edit",
      name: "Edit note",
      component: () => import("../views/EditNoteView.vue"),
    },
    {
      path: "/trash",
      name: "Recycle Bin",
      component: () => import("../views/RecycleBinView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path: "/login",
      name: "Sign In",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/policy",
      name: "Privacy Policy",
      component: () => import("../views/PrivacyPolicyView.vue"),
    },
  ],
});

export default router;
