import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      // Route-level code splitting: Dynamic import reduces initial bundle size
      component: () => import("./views/AppHome.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      // Route-level code splitting: Dynamic import reduces initial bundle size
      component: () => import("./views/ProjectsView.vue"),
    },
    {
      path: "/project/:slug",
      name: "singleProject",
      // Route-level code splitting: Dynamic import reduces initial bundle size
      component: () => import("./views/SingleProject.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      // Route-level code splitting: Dynamic import reduces initial bundle size
      component: () => import("./views/ContactView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      // Route-level code splitting: Dynamic import reduces initial bundle size
      component: () => import("./views/PageNotFound.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
});

export { router };
