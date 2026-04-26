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
      // Store the scroll listener and animation frame ID to be able to clean them up
      scrollListener: null,
      scrollRafId: null,
    }
  },
  mounted() {
    // Optimization: Extracted the scroll listener to a method and used requestAnimationFrame to throttle it
    this.scrollListener = () => {
      if (this.scrollRafId) {
        window.cancelAnimationFrame(this.scrollRafId);
      }
      this.scrollRafId = window.requestAnimationFrame(() => {
        // Optimization: added null checks for DOM elements before accessing properties
        if (!state.headerEl) return;

        if (this.$route.name === "home") {
          // Optimization: replaced getClientRects()[0] with getBoundingClientRect() for better performance
          if (state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if (state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
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
      });
    };

    // Optimization: Add { passive: true } to prevent main thread blocking on scroll
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  },
  unmounted() {
    // Optimization: Clean up event listener and cancel any pending animation frame to prevent memory leaks and unintended execution
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.scrollRafId) {
      window.cancelAnimationFrame(this.scrollRafId);
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
