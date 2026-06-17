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
    // Bolt: Define non-reactive properties on the instance for performance
    this._rafId = null;

    // Bolt: Optimized scroll handler with requestAnimationFrame throttling, passive listener, and null checks
    this._scrollHandler = () => {
      if (this._rafId) return;

      this._rafId = window.requestAnimationFrame(() => {
        if (this.$route.name === "home") {
          // Bolt: Add null checks for global DOM elements and use getBoundingClientRect()
          if (!state.headerEl || !state.footerEl || !state.projectsSectionEl || !state.skillsSectionEl || !state.aboutSectionEl) {
            this._rafId = null;
            return;
          }

          if (state.footerEl.getBoundingClientRect().top <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (state.projectsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if (state.skillsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if (state.aboutSectionEl.getBoundingClientRect().top <= 65) {
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
        this._rafId = null;
      });
    };

    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Bolt: Clean up event listeners and animation frames to prevent memory leaks
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
