import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";
import SingleProject from "./views/SingleProject.vue";
import PageNotFound from "./views/PageNotFound.vue";

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
      name: "singleProject",
      component: SingleProject,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: PageNotFound,
    },
  ]
});

export { router };
