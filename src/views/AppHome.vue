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
      scrollAnimationFrame: null,
      scrollHandler: null,
    }
  },
  mounted() {
    // Optimization: define handler with requestAnimationFrame to throttle scroll events
    this.scrollHandler = () => {
      if (this.scrollAnimationFrame) {
        cancelAnimationFrame(this.scrollAnimationFrame);
      }
      this.scrollAnimationFrame = requestAnimationFrame(() => {
        if (this.$route.name === "home" && state.headerEl) {
          // Optimization: check element existence and use getBoundingClientRect() over getClientRects()[0] for better performance
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
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    };

    // Optimization: add { passive: true } to prevent main thread blocking and improve scroll performance
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimization: Cleanup scroll listener and animation frame on unmount to prevent memory leaks and unintended execution
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.scrollAnimationFrame) {
      cancelAnimationFrame(this.scrollAnimationFrame);
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
