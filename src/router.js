import { createRouter, createWebHistory } from "vue-router";

// ⚡ Bolt: Implemented route-level code splitting using dynamic imports.
// This reduces the initial bundle size by lazy-loading components only when their routes are visited.
const AppHome = () => import("./views/AppHome.vue");
const ProjectsView = () => import("./views/ProjectsView.vue");
const SingleProject = () => import("./views/SingleProject.vue");
const ContactView = () => import("./views/ContactView.vue");
const PageNotFound = () => import("./views/PageNotFound.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/project/:slug",
      name: "singleProject",
      component: SingleProject,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: PageNotFound,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
});

export { router };
