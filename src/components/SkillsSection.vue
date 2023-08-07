<script>
import { state } from '../state';
import SectionTitle from './SectionTitle.vue';
import MissingSection from './MissingSection.vue';
export default {
  name: "SkillsSection",
  components: {
    SectionTitle,
    MissingSection,
  },
  data() {
    return {
      state,
    }
  },
  mounted() {
    state.skillsSectionEl = document.getElementById("skillsSection");
  }
}
</script>

<template>
  <div id="skillsSection" class="pb-5">
    <div class="container">
      <SectionTitle>MY SKILLS</SectionTitle>
      <div v-if="state.alphabeticalTechnologies.length > 0" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3 justify-content-center">
        <div class="col" v-for="technology in state.alphabeticalTechnologies">
          <div class="technologyWrapper rounded-3 p-2">
            <img :src="state.host + state.imagesPath + technology.logo" :alt="technology.name + ' Logo'">
            <p class="mb-0 mt-2 fw-semibold">{{ technology.name }}</p>
          </div>
        </div>
      </div>
      <div v-else class="mb-0">
        <MissingSection>
          <br>
          New skills are coming.
          <br>
          Be sure to come back later to see them!
        </MissingSection>        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_SkillsSection.scss";
</style>
