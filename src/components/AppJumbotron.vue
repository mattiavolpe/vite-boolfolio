<script>
import axios from 'axios';
import { state } from '../state';
export default {
  name: "AppJumbotron",
  data() {
    return {
      state,
      technologies: [],
      technologiesToShow: [],
    }
  },
  methods: {
    getTechnologies(url) {
      axios
      .get(url)
      .then(response => {
        if(response.data.success) {
          this.technologies = response.data.technologies;
          this.getRandomTechnologies();
        }
      })
      .catch(error => {
        console.error(error.message);
      })
    },
    getRandomTechnologies() {
      while(this.technologiesToShow.length < 3) {
        const selectedTechnology = this.technologies[Math.floor(Math.random() * this.technologies.length)];
        if(!this.technologiesToShow.includes(selectedTechnology)) {
          this.technologiesToShow.push(selectedTechnology);
        }
      }
    }
  },
  mounted() {
    this.getTechnologies(state.host + state.technologiesEndpoint);
  }
}
</script>

<template>
  <section id="homeJumbotron">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 align-items-center py-3">
        <div id="jumboLeftSection" class="col">
          <h1>Hey, I'm <span class="text_accent_custom fw-bold">Mattia Volpe</span></h1>
          <h4 class="my-2">Junior (for now <span class="text_accent_custom">&smile;</span>) <br>Full-Stack Web Developer</h4>
          <router-link :to="{name: 'contacts'}" class="d-block text_accent_custom text-decoration-none rounded fw-medium">Contact me</router-link>
        </div>
        <div id="jumboRightSection" class="col d-flex justify-content-center align-items-center py-4">
          <div id="logosRelativeReference" class="position-relative">
            <div id="avatarWrapper">
              <img class="img-fluid" :src="state.getImageUrl('avatar_optimized.png')" alt="Mattia Volpe's Avatar">
            </div>
            <div id="logos" v-if="technologies.length > 0">
              <div class="logoWrapper" v-for="n in 3">
                <img :src="state.host + state.imagesPath + technologiesToShow[n - 1].logo" :alt="technologiesToShow[n - 1].name + ' Logo'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="scrollDownWrapper" class="text-center py-2">
      <a href="#aboutSection">
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="fa-4x text_accent_custom"/>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_HomeJumbotron.scss";
</style>
