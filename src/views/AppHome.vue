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
  created() {
    this.scrollAnimationFrameId = null;
    this.scrollHandler = () => {
      if (this.scrollAnimationFrameId) {
        cancelAnimationFrame(this.scrollAnimationFrameId);
      }
      this.scrollAnimationFrameId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // Add null checks for elements
          if (!state.headerEl) return;

          if(state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else {
          if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        }
      });
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.scrollAnimationFrameId) {
      cancelAnimationFrame(this.scrollAnimationFrameId);
    }
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
