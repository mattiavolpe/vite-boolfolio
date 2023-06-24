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
      <img :src="host + imagesPath + project.image" :alt="project.name + ' Image'">
      <div class="infos">
        <p class="text_dark_custom text-uppercase" v-if="project.type">{{ project.type.name }}</p>
        <button class="singleProjectLink text-decoration-none py-2 px-3 rounded bg_dark_custom text_accent_custom fw-bold">See details</button>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_ProjectCard.scss";
</style>
