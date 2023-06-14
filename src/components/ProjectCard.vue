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
  <div class="card border-0 bg-black box_shadow_custom_green h-100">
    <img class="card-img-top" :src="host + imagesPath + project.image">
    <div class="card-header text-center showcase_project_title">
        <a :href="project.repositoryUrl" target="_blank" class="text_custom_green">
            <h5 class="mb-0 fw-bold text_custom_green">{{ project.name }}</h5>
        </a>
    </div>
    <div class="card-body">
      <template v-if="project.repositoryUrl">
        <h6 class="text_custom_green fw-bold mb-0">Repository URL:</h6>
        <a :href="project.repositoryUrl" target="_blank" class="text-white fw-normal mb-2 d-block">{{ project.repositoryUrl }}</a>
        <hr class="border_custom_green">
      </template>
      <h6 class="text_custom_green fw-bold" v-if="project.type">Project type:
        <span class="text-white fw-normal">{{ project.type.name }}</span>
        <hr class="border_custom_green">
      </h6>
      <template v-if="project.technologies">
        <h6 class="text_custom_green fw-bold mb-0">Used technologies:</h6>
        <ul class="text_custom_green fw-bold list-unstyled"> 
          <li class="text-white fw-normal" v-for="technology in project.technologies">{{ technology.name }}</li>
        </ul>
      </template>
    </div>
  </div>
</template>
