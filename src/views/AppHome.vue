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
  // Initialize internal, non-reactive state variables in created() to avoid Vue reactivity overhead
  created() {
    this.ticking = false;
    this.rafId = null;
    this.handleScroll = this.handleScroll.bind(this);
  },
  mounted() {
    // Add { passive: true } to the event listener to optimize scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Always clean up global event listeners and cancel requestAnimationFrame
    // in the unmounted hook to prevent memory leaks and unintended execution
    window.removeEventListener('scroll', this.handleScroll);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  },
  methods: {
    handleScroll() {
      // Use requestAnimationFrame to throttle the scroll event handler
      if (!this.ticking) {
        this.rafId = requestAnimationFrame(() => {
          this.updateHeaderClass();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    updateHeaderClass() {
      // Ensure state elements exist before accessing properties
      if (!state.headerEl || !state.footerEl || !state.projectsSectionEl || !state.skillsSectionEl || !state.aboutSectionEl) {
        return;
      }

      if (this.$route.name === "home") {
        // Use getBoundingClientRect() instead of getClientRects()[0] for safer DOM measurements
        if (state.footerEl.getBoundingClientRect().y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.projectsSectionEl.getBoundingClientRect().y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if (state.skillsSectionEl.getBoundingClientRect().y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.aboutSectionEl.getBoundingClientRect().y <= 65) {
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
