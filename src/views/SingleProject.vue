<script>
import { state } from "../state";
import axios from 'axios';
import PageLoader from '../components/PageLoader.vue';
import SectionTitle from '../components/SectionTitle.vue';

export default {
    name: "SingleProject",
    components: {
      PageLoader,
      SectionTitle
    },
    data() {
        return {
            state,
            project: null,
        };
    },
    mounted() {
        axios
        .get(state.host + state.projectsEndpoint + this.$route.params.slug)
        .then(response => {
            if (response.data.success) {
                this.project = response.data.project;
            }
            else {
                this.$router.push({
                    name: "page404"
                });
            }
        })
        .catch(error => {
            console.error(error.message);
        });
    },
}
</script>

<template>
  <div class="container py-5" v-if="project && !loading">
    <SectionTitle>
        {{ project.name }}
    </SectionTitle>
    <div class="text-center py-4">
      <img class="img-fluid" :src="state.host + state.imagesPath + project.image" :alt="`${project.name} image`">
    </div>
    <template v-if="project.repositoryUrl">
        <h3 class="text_accent_custom fw-bold mb-0">Repository URL:</h3>
        <a id="repositoryUrl" :href="project.repositoryUrl" target="_blank" class="text_light_custom fw-normal mb-2 d-block fs-4">{{ project.repositoryUrl }}</a>
        <hr class="border_custom_green">
      </template>
      <h3 class="text_accent_custom fw-bold" v-if="project.type">Project type:
        <span class="text_light_custom fw-normal fs-4">{{ project.type.name }}</span>
        <hr class="border_custom_green">
      </h3>
      <template v-if="project.technologies">
        <h3 class="text_accent_custom fw-bold mb-0">Used technologies:</h3>
        <ul class="fw-bold list-unstyled"> 
          <li class="text_light_custom fw-normal fs-4" v-for="technology in project.technologies">
            <img :src="state.host + state.imagesPath + technology.logo" :alt="technology.name + ' Logo'">
          </li>
        </ul>
      </template>
  </div>
  <PageLoader v-else>
    LOADING PROJECT DETAILS...
  </PageLoader>
</template>

<style lang="scss" scoped>
#repositoryUrl {
  word-break: break-all;
}
</style>
