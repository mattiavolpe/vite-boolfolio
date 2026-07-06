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
    this._ticking = false;
    this._scrollHandler = () => {
      if (!this._ticking) {
        this._ticking = true;
        this._rafId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // Check for elements and use getBoundingClientRect() for better performance
            if (state.footerEl && state.footerEl.getBoundingClientRect().top <= 90) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if (state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().top <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else if (state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().top <= 65) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if (state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().top <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else {
              if (state.headerEl) {
                state.headerEl.classList.remove("bg_dark_blue_custom");
                state.headerEl.classList.add("bg_dark_custom");
              }
            }
          } else {
            if (state.headerEl) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            }
          }
          this._ticking = false;
        });
      }
    };
    // Use passive listener to prevent main thread blocking
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Clean up event listener and cancel any pending animation frame
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
