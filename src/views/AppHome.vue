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
      scrollFrameId: null, // Store animation frame ID for cancellation
    }
  },
  methods: {
    handleScroll() {
      // Use requestAnimationFrame to throttle scroll event handling
      // This prevents the browser from doing too much work per frame
      if (this.scrollFrameId) {
        cancelAnimationFrame(this.scrollFrameId);
      }

      this.scrollFrameId = requestAnimationFrame(() => {
        if (this.$route.name === "home") {
          // Add null checks to prevent runtime errors if elements aren't mounted yet
          if (!state.headerEl) return;

          // Use getBoundingClientRect() which is generally more performant and standard
          // than getClientRects()[0] for single elements
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
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    // Clean up global event listener to prevent memory leaks and
    // unintended execution when navigating to other routes
    window.removeEventListener('scroll', this.handleScroll);
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
