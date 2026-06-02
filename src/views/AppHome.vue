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
    this._rafId = null;
    this._scrollHandler = () => {
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
      }
      this._rafId = requestAnimationFrame(() => {
        // Optimize: Use requestAnimationFrame to throttle scroll events and getBoundingClientRect for better performance
        if (this.$route.name === "home" && state.headerEl) {
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
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this._scrollHandler);
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
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
