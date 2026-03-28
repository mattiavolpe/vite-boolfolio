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
    // ⚡ Bolt Optimization: Use a non-reactive instance variable for the scroll flag
    // Why: Adding it to data() creates unnecessary reactivity tracking for a purely internal state
    // Impact: Minor memory/initialization savings, cleaner separation of concerns
    this.scrollTicking = false;
  },
  methods: {
    updateHeaderBackground() {
      // Check if elements exist to prevent errors when navigating away
      if (!state.headerEl || !state.footerEl || !state.projectsSectionEl || !state.skillsSectionEl || !state.aboutSectionEl) return;

      if(this.$route.name === "home") {
        if(state.footerEl.getClientRects()[0].y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.projectsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if(state.skillsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.aboutSectionEl.getClientRects()[0].y <= 65) {
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
    },
    handleScroll() {
      // ⚡ Bolt Optimization: Throttle heavy DOM reads (getClientRects) during scroll
      // Why: Scroll events fire rapidly. Synchronous layout reads cause layout thrashing and frame drops.
      // Impact: Synchronizes DOM updates with the browser's paint cycle, ensuring a smooth 60fps scroll.
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderBackground();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    // ⚡ Bolt Optimization: Remove global event listener on component unmount
    // Why: The scroll listener previously persisted after navigating away from AppHome.
    // Impact: Prevents memory leaks and unnecessary processing (CPU cycles) on other routes.
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
