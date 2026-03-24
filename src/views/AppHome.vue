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
      ticking: false,
    }
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderBackground();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    updateHeaderBackground() {
      // ⚡ Bolt: Performance Optimization
      // Replaced anonymous scroll handler with requestAnimationFrame throttling
      // and proper cleanup to prevent memory leaks and layout thrashing.
      if (this.$route.name === "home") {
        if (state.footerEl && state.footerEl.getClientRects()[0].y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.projectsSectionEl && state.projectsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if (state.skillsSectionEl && state.skillsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.aboutSectionEl && state.aboutSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      } else if (state.headerEl) {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
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
