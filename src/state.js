import { reactive } from "vue";

export const state = new reactive({
  host: "http://127.0.0.1:8000/",
  projectsEndpoint: "api/projects/",
  latestProjectsEndpoint: "api/latestProjects/",
  technologiesEndpoint: "api/technologies/",
  imagesPath: "storage/",

  technologies: [],
  technologiesToShow: [],
  alphabeticalTechnologies: [],
  
  headerEl: null,
  aboutSectionEl: null,
  skillsSectionEl: null,
  projectsSectionEl: null,
  
  getImageUrl(imgName) {
    return new URL(`./assets/img/${imgName}`, import.meta.url).href
  },
})
