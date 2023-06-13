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
    <div class="card-header">
        <a :href="project.repositoryUrl" target="_blank" class="text_custom_green">
            <h5 class="mb-0 fw-bold text_custom_green">{{ project.name }}</h5>
        </a>
    </div>
    <div class="card-body" v-if="project.type">
        <h6 class="text_custom_green fw-bold">Type: <span class="text-white">{{ project.type.name }}</span></h6>
        <div v-if="project.technologies" class="d-flex align-items-start gap-2">
            <h6 class="text_custom_green fw-bold">Technologies:</h6>
            <ul class="text_custom_green fw-bold list-unstyled"> 
                <li class="text-white" v-for="technology in project.technologies">{{ technology.name }}</li>
            </ul>
        </div>
    </div>
  </div>
</template>
