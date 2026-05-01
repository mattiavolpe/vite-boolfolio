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
      rafId: null, // Track animation frame for cleanup
    }
  },
  methods: {
    // Extracted scroll logic to a method to allow for cleanup and throttling
    scrollListener() {
      // Throttle the scroll event to the next animation frame
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.rafId = requestAnimationFrame(() => {
        if(this.$route.name === "home" && state.headerEl) {
          // Replaced getClientRects()[0] with getBoundingClientRect() for performance
          // Added null checks to avoid errors if elements are not yet mounted
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
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    }
  },
  mounted() {
    // Added { passive: true } to optimize scrolling performance
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  },
  unmounted() {
    // Clean up event listener and pending animation frame to prevent memory leaks
    window.removeEventListener('scroll', this.scrollListener);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
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
