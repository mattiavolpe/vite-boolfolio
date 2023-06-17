import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";
import ProjectsView from "./views/ProjectsView.vue"
import SingleProject from "./views/SingleProject.vue";
import ContactsView from "./views/ContactsView.vue";
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
      path: "/contacts",
      name: "contacts",
      component: ContactsView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: PageNotFound,
    },
  ]
});

export { router };
