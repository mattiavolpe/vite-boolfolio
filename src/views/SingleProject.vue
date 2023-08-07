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
      <h3 class="text_accent_custom fw-bold">Repository URL:</h3>
      <a id="repositoryUrl" :href="project.repositoryUrl" target="_blank" class="text_light_custom fw-normal mb-2 d-block fs-4">{{ project.repositoryUrl }}</a>
      <hr>
    </template>
    <template v-if="project.type">
      <h3 class="text_accent_custom fw-bold" >Project type:</h3>
      <span class="text_light_custom fw-normal d-block fs-4">{{ project.type.name }}</span>
      <hr>
    </template>
    <template v-if="project.technologies">
      <h3 class="text_accent_custom fw-bold">Used technologies:</h3>
      <ul class="fw-bold list-unstyled row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3 justify-content-center"> 
        <li class="col" v-for="technology in project.technologies">
          <div class="technologyWrapper rounded-3 p-2">
            <img :src="state.host + state.imagesPath + technology.logo" :alt="technology.name + ' Logo'">
            <p class="mb-0 mt-2 fw-normal">{{ technology.name }}</p>
          </div>
        </li>
      </ul>
    </template>
  </div>
  <PageLoader v-else>
    LOADING PROJECT DETAILS...
  </PageLoader>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_SingleProject.scss";
</style>
