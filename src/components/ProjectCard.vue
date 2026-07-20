<script>
export default {
  name: "ProjectCard",
  props: {
    project: Object,
    host: String,
    imagesPath: String,
  }
}
</script>

<template>
  <router-link :to="{name: 'singleProject', params:{slug: project.slug}}">
    <div class="projectWrapper rounded-3 p-2 position-relative">
      <!-- OPTIMIZATION: Added loading="lazy" to defer offscreen images, improving initial page load time and bandwidth usage -->
      <img v-if="project.image" :src="host + imagesPath + project.image" :alt="project.name + ' Image'" loading="lazy">
      <img v-else :src="host + imagesPath + 'uploads/image_not_available.png'" alt="Image not found placeholder" style="aspect-ratio: 405 / 205;" loading="lazy">
      <div class="infos">
        <p class="text_dark_custom text-uppercase text-center" v-if="project.type">{{ project.type.name }}</p>
        <button class="singleProjectLink text-decoration-none py-2 px-3 rounded bg_dark_custom text_accent_custom fw-bold">See details</button>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_ProjectCard.scss";
</style>
