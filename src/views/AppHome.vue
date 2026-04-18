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
  created() {
    // Initialize purely internal, non-reactive state variables here
    // rather than in data() to prevent unnecessary reactivity tracking overhead.
    this.scrollFrameId = null;
    this.scrollHandler = this.handleScroll.bind(this);
  },
  methods: {
    handleScroll() {
      // Throttle the scroll handler using requestAnimationFrame() to sync
      // layout measurements with browser paints.
      if (this.scrollFrameId) {
        cancelAnimationFrame(this.scrollFrameId);
      }

      this.scrollFrameId = requestAnimationFrame(() => {
        if (!state.headerEl) return; // Add null check to avoid null reference error

        if(this.$route.name === "home") {
          // Use getBoundingClientRect().top instead of getClientRects()[0].y to prevent runtime crashes
          // if an element is unrendered or hidden.
          if(state.footerEl && state.footerEl.getBoundingClientRect().top <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().top <= 65) {
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
    }
  },
  mounted() {
    // Bind the scroll event listener with { passive: true } to optimize scrolling performance
    // by informing the browser that preventDefault() will not be called.
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // Remove global event listeners and cancel requestAnimationFrame
    // in the unmounted hook to prevent memory leaks and unnecessary processing on other routes.
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.scrollFrameId) {
      cancelAnimationFrame(this.scrollFrameId);
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
