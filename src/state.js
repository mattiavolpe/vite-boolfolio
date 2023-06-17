import { reactive } from "vue";

export const state = new reactive({
  getImageUrl(imgName) {
    return new URL(`./assets/img/${imgName}`, import.meta.url).href
  }
})
