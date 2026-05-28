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
    this._scrollHandler = () => {
      if (this._animationFrameId) {
        cancelAnimationFrame(this._animationFrameId);
      }
      this._animationFrameId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // Optimize: null safety check to prevent errors on home page
          if (!state.headerEl || !state.footerEl || !state.projectsSectionEl || !state.skillsSectionEl || !state.aboutSectionEl) return;

          // Optimize: getBoundingClientRect() is faster than getClientRects()[0]
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
          if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        }
      });
    };
    // Optimize: passive: true to prevent blocking main thread
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimize: cleanup listener to prevent memory leaks and background execution
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
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
