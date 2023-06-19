<script>
import { state } from '../state';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue';
export default {
  name: "ProjectsSection",
  components: {
    SectionTitle,
  },
  data() {
    return {
      state,
      projects: [],
    }
  },
  methods: {
    getProjects(url) {
      axios
      .get(url)
      .then(response => {
        console.log(response);
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
    this.getProjects(state.host + state.projectsEndpoint);
  }
}
</script>

<template>
  <div id="projectsSection" class="pb-5">
    <div class="container">
      <SectionTitle>PROJECTS OVERVIEW</sectionTitle>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <div class="col" v-for="project in projects">
          <router-link :to="{name: 'singleProject', params:{slug: project.slug}}">
            <div class="projectWrapper rounded-3 p-2">
              <img :src="state.host + state.imagesPath + project.image" :alt="project.name + ' Image'">
              <div class="infos">
                
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;

#projectsSection {
  background: linear-gradient(180deg, $dark, $darkBlue 25px);
  padding-top: 90px;

  .projectWrapper {
    background-color: $lightBlue;

    .infos {
      opacity: 0;
      transition: 0.6s;
    }

    &:hover {
      .infos {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      object-fit: contain;
      transition: 0.6s;
    }
  }
}
</style>
