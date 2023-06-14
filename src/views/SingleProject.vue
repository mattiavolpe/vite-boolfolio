<script>
import axios from 'axios';

export default {
  name: "SingleProject",
  data() {
    return {
      host: "http://127.0.0.1:8000/",
      projectsEndpoint: "api/projects",
      imagesPath: "storage/",
      project: null,
    }
  },
  mounted() {
    axios
    .get(this.host + this.projectsEndpoint + "/" + this.$route.params.slug)
    .then(response => {
      if(response.data.success) {
        this.project = response.data.project;
      } else {
        this.$router.push({
          name: 'page404'
        });
      }
    })
    .catch(error => {
      console.error(error.message);
    })
  }
}
</script>

<template>
  <div class="container py-5" v-if="project">
    <h1 class="text-center text_custom_green mb-0">{{ project.name }}</h1>
    <div class="text-center py-4">
      <img class="img-fluid" :src="host + imagesPath + project.image" alt="">
    </div>
    <template v-if="project.repositoryUrl">
        <h3 class="text_custom_green fw-bold mb-0">./Repository URL:</h3>
        <a :href="project.repositoryUrl" target="_blank" class="text-white fw-normal mb-2 d-block fs-4">{{ project.repositoryUrl }}</a>
        <hr class="border_custom_green">
      </template>
      <h3 class="text_custom_green fw-bold" v-if="project.type">./Project type:
        <span class="text-white fw-normal fs-4">{{ project.type.name }}</span>
        <hr class="border_custom_green">
      </h3>
      <template v-if="project.technologies">
        <h3 class="text_custom_green fw-bold mb-0">./Used technologies:</h3>
        <ul class="text_custom_green fw-bold list-unstyled"> 
          <li class="text-white fw-normal fs-4" v-for="technology in project.technologies">{{ technology.name }}</li>
        </ul>
      </template>
  </div>
</template>
