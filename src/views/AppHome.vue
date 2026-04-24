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
      scrollRafId: null,
    }
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttled scroll handling using requestAnimationFrame to prevent main thread blocking
      if (this.scrollRafId) return;

      this.scrollRafId = requestAnimationFrame(() => {
        if (this.$route.name === "home" && state.headerEl) {
          // ⚡ Bolt: Null checks added for safety before accessing properties
          // ⚡ Bolt: Replaced getClientRects()[0] with getBoundingClientRect() for better performance
          const footerY = state.footerEl ? state.footerEl.getBoundingClientRect().y : Infinity;
          const projectsY = state.projectsSectionEl ? state.projectsSectionEl.getBoundingClientRect().y : Infinity;
          const skillsY = state.skillsSectionEl ? state.skillsSectionEl.getBoundingClientRect().y : Infinity;
          const aboutY = state.aboutSectionEl ? state.aboutSectionEl.getBoundingClientRect().y : Infinity;

          if (footerY <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (projectsY <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if (skillsY <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (aboutY <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
        this.scrollRafId = null;
      });
    }
  },
  mounted() {
    // ⚡ Bolt: Added { passive: true } to scroll event listener to improve scroll performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Clean up global event listener and cancel animation frame to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
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
