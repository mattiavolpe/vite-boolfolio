import { reactive } from "vue";

export const state = new reactive({
  host: "http://127.0.0.1:8000/",
  projectsEndpoint: "api/projects",
  technologiesEndpoint: "api/technologies",
  imagesPath: "storage/",
  
  getImageUrl(imgName) {
    return new URL(`./assets/img/${imgName}`, import.meta.url).href
  }
})
