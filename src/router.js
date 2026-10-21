import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/AppHome.vue"), // ⚡ Bolt: Route-level code splitting
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./views/ProjectsView.vue"), // ⚡ Bolt: Route-level code splitting
    },
    {
      path: "/project/:slug",
      name: "singleProject",
      component: () => import("./views/SingleProject.vue"), // ⚡ Bolt: Route-level code splitting
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("./views/ContactView.vue"), // ⚡ Bolt: Route-level code splitting
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: () => import("./views/PageNotFound.vue"), // ⚡ Bolt: Route-level code splitting
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
});

export { router };
