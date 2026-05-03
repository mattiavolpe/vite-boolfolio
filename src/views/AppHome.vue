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
      scrollRafId: null, // Store requestAnimationFrame ID for cleanup
    }
  },
  methods: {
    // Why: Extracting the handler makes it easier to remove later
    onScroll() {
      // Why: Throttle with requestAnimationFrame to avoid layout thrashing and sync with browser paint
      if (this.scrollRafId !== null) return;
      this.scrollRafId = requestAnimationFrame(this.handleScroll);
    },
    handleScroll() {
      this.scrollRafId = null;

      // Why: Ensure header element exists before manipulating it
      if (!state.headerEl) return;

      if(this.$route.name === "home") {
        // Why: Use getBoundingClientRect() instead of getClientRects()[0] for better performance
        // Why: Check if element exists before reading bounds
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
      } else {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      }
    }
  },
  mounted() {
    // Why: Use { passive: true } to not block the main thread while scrolling
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  unmounted() {
    // Why: Explicitly remove event listener and cancel frame to prevent memory leaks
    window.removeEventListener('scroll', this.onScroll);
    if (this.scrollRafId !== null) {
      cancelAnimationFrame(this.scrollRafId);
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
