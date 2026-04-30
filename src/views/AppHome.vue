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
      scrollFrameId: null, // Keep track of the frame ID to cancel if needed
    }
  },
  methods: {
    handleScroll() {
      // Throttle the scroll handler to prevent jank using requestAnimationFrame
      if (this.scrollFrameId) return;

      this.scrollFrameId = requestAnimationFrame(() => {
        if (this.$route.name === "home" && state.headerEl) {
          // Use getBoundingClientRect() for better performance and check for existence
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

        this.scrollFrameId = null; // Reset to allow the next frame
      });
    }
  },
  mounted() {
    // Add passive: true flag for better scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Always clean up event listeners to prevent memory leaks
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
