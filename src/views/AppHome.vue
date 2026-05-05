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
    // ⚡ Bolt Optimization: Extract handler for cleanup and throttle with requestAnimationFrame
    this._scrollHandler = () => {
      if (this._rafId) {
        window.cancelAnimationFrame(this._rafId);
      }
      this._rafId = window.requestAnimationFrame(() => {
        if (!state.headerEl) return; // ⚡ Safe access check

        if(this.$route.name === "home") {
          // ⚡ Bolt Optimization: Use getBoundingClientRect() instead of getClientRects()[0] for better performance
          // ⚡ Added safe access checks to prevent errors if elements aren't mounted yet
          const footerY = state.footerEl ? state.footerEl.getBoundingClientRect().y : Infinity;
          const projectsY = state.projectsSectionEl ? state.projectsSectionEl.getBoundingClientRect().y : Infinity;
          const skillsY = state.skillsSectionEl ? state.skillsSectionEl.getBoundingClientRect().y : Infinity;
          const aboutY = state.aboutSectionEl ? state.aboutSectionEl.getBoundingClientRect().y : Infinity;

          if(footerY <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(projectsY <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(skillsY <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(aboutY <= 65) {
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

    // ⚡ Bolt Optimization: Add { passive: true } to prevent main thread blocking
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt Optimization: Clean up event listener and rAF to prevent memory leaks
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
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
