<script>
import { state } from '../state';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue';
import MissingSection from './MissingSection.vue';
export default {
  name: "ProjectsSection",
  components: {
    SectionTitle,
    MissingSection,
  },
  data() {
    return {
      state,
      projects: null,
    }
  },
  methods: {
    getProjects(url) {
      axios
      .get(url)
      .then(response => {
        if(response.data.success) {
          this.projects = response.data.projects;          
        }
      })
      .catch(error => {
        console.error(error.message);
      })
    },
  },
  mounted() {
    state.projectsSectionEl = document.getElementById("projectsSection");
    this.getProjects(state.host + state.latestProjectsEndpoint);
  }
}
</script>

<template>
  <div id="projectsSection" class="pb-5">
    <div class="container">
      <SectionTitle>PROJECTS OVERVIEW</sectionTitle>
      <h6 v-if="projects" class="text-center text-uppercase mb-5">These are my 3 newest projects. Click the button below to see all my projects</h6>
      <div v-if="projects" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-3">
        <div class="col" v-for="project in projects">
          <router-link :to="{name: 'singleProject', params:{slug: project.slug}}">
            <div class="projectWrapper rounded-3 p-2 position-relative">
              <img :src="state.host + state.imagesPath + project.image" :alt="project.name + ' Image'">
              <div class="infos">
                <p class="text_dark_custom fw-bold text-uppercase">{{ project.name }}</p>
                <router-link :to="{name: 'singleProject', params:{slug: project.slug}}" class="singleProjectLink text-decoration-none py-2 px-3 rounded bg_dark_custom text_accent_custom fw-bold">See details</router-link>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="projects" class="text-center mt-4">
        <router-link id="allProjectsButton" :to="{name: 'projects'}" class="text-decoration-none py-2 px-3 rounded text_accent_custom fw-bold">See all projects</router-link>
      </div>
      <div v-else class="mb-0">
        <MissingSection>
          <br>
          New projects are coming.
          <br>
          Be sure to come back later to see them!
        </MissingSection>        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_ProjectsSection.scss";
</style>
