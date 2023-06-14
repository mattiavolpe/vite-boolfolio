import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";
import SingleProject from "./views/SingleProject.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/project/:slug",
      name: "single-project",
      component: SingleProject,
    },
  ]
});

export { router };
