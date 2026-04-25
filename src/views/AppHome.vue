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
      // ⚡ Bolt: Store requestAnimationFrame ID for cleanup to prevent memory leaks
      scrollRafId: null,
    }
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttle scroll event using requestAnimationFrame to prevent layout thrashing
      if (this.scrollRafId) {
        window.cancelAnimationFrame(this.scrollRafId);
      }
      this.scrollRafId = window.requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // ⚡ Bolt: Replaced getClientRects()[0] with getBoundingClientRect() for faster layout measurements
          // We also check for truthy DOM elements to prevent errors if elements aren't mounted yet
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
          } else if(state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else if(state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    }
  },
  mounted() {
    // ⚡ Bolt: Added { passive: true } to prevent main thread blocking during scrolling
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Clean up event listener and pending animation frame to prevent memory leaks across routes
    window.removeEventListener('scroll', this.handleScroll);
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
