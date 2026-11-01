import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";
// Lazy-load non-initial routes to reduce initial bundle size
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
