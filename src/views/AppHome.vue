<script>
import { state } from '../state';
import AppJumbotron from '../components/AppJumbotron.vue';
import AboutSection from '../components/AboutSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
export default {
  name: "AppHome",
  components: {
    AppJumbotron,
    AboutSection,
    SkillsSection,
    ProjectsSection,
  },
  data() {
    return {
      state,
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(state.projectsSectionEl.getClientRects()[0].y <= 65) {
        state.headerEl.classList.remove("bg_dark_custom");
        state.headerEl.classList.add("bg_dark_blue_custom");
      } else if(state.skillsSectionEl.getClientRects()[0].y <= 65) {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      } else if(state.aboutSectionEl.getClientRects()[0].y <= 65) {
        state.headerEl.classList.remove("bg_dark_custom");
        state.headerEl.classList.add("bg_dark_blue_custom");
      } else {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      }
    })
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
