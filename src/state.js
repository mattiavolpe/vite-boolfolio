import { reactive } from "vue";

export const state = new reactive({
  host: import.meta.env.VITE_DB_BASE_SITE,
  projectsEndpoint: "api/projects/",
  latestProjectsEndpoint: "api/latestProjects/",
  technologiesEndpoint: "api/technologies/",
  contactEndpoint: "api/contact/",
  imagesPath: import.meta.env.VITE_IMAGES_PATH,

  technologies: [],
  technologiesToShow: [],
  alphabeticalTechnologies: [],
  
  headerEl: null,
  aboutSectionEl: null,
  skillsSectionEl: null,
  projectsSectionEl: null,
  footerEl: null,
  
  getImageUrl(imgName) {
    return new URL(`./assets/img/${imgName}`, import.meta.url).href
  },
})
