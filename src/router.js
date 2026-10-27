import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/AppHome.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./views/ProjectsView.vue"),
    },
    {
      path: "/project/:slug",
      name: "singleProject",
      component: () => import("./views/SingleProject.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("./views/ContactView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: () => import("./views/PageNotFound.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
});

export { router };
