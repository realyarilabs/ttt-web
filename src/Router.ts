import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
      name: "homepage",
    },
    {
      path: "/game/:gameID",
      component: () => import("./views/Game.vue"),
      name: "game",
    },
  ],
});

export default router;
