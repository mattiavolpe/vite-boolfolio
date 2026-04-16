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
    // Initialize purely internal, non-reactive state variables in created()
    // rather than in data() to prevent unnecessary reactivity tracking overhead.
    this.scrollFrameId = null;
  },
  methods: {
    handleScroll() {
      // Use requestAnimationFrame to throttle scroll event listeners that perform
      // layout measurements (like getBoundingClientRect) or DOM manipulations
      // to ensure updates are synchronized with the browser's paint cycle.
      if (this.scrollFrameId) {
        window.cancelAnimationFrame(this.scrollFrameId);
      }
      this.scrollFrameId = window.requestAnimationFrame(() => {
        // Ensure element references exist before accessing their properties
        // because child components may not have mounted yet.
        if (!state.headerEl || !state.footerEl || !state.projectsSectionEl || !state.skillsSectionEl || !state.aboutSectionEl) {
          return;
        }

        // Removed condition for this.$route.name === "home" as unmounted() hook handles teardown.
        // Use getBoundingClientRect() instead of getClientRects()[0] for DOM measurements
        // to prevent runtime crashes if an element is unrendered or hidden.
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
      });
    }
  },
  mounted() {
    // Always use { passive: true } when attaching global scroll or touch event listeners
    // to optimize scrolling performance by informing the browser that preventDefault() will not be called.
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Always remove global event listeners in unmounted hook to prevent memory leaks
    // and unnecessary processing on other routes.
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollFrameId) {
      window.cancelAnimationFrame(this.scrollFrameId);
    }
    // Reset header class when leaving the home page
    if (state.headerEl) {
      state.headerEl.classList.remove("bg_dark_blue_custom");
      state.headerEl.classList.add("bg_dark_custom");
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
