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
      rafId: null,
      handleScroll: null,
    }
  },
  mounted() {
    this.handleScroll = () => {
      if (this.rafId) return; // Prevent multiple rAF calls

      this.rafId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // Optimization: Use getBoundingClientRect() instead of getClientRects()[0] for better performance
          if(state.footerEl.getBoundingClientRect().y <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
        this.rafId = null;
      });
    };

    // Optimization: Use { passive: true } to prevent scroll blocking
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Cleanup: Remove listener and cancel any pending frame to prevent memory leaks
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
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
