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
      scrollTicking: false,
      scrollRafId: null,
    }
  },
  methods: {
    // ⚡ Bolt: Performance Optimization
    // Throttle scroll event using requestAnimationFrame to prevent main thread blocking,
    // use getBoundingClientRect() which is faster than getClientRects(),
    // and safely check if elements exist before accessing properties.
    handleScroll() {
      if (!this.scrollTicking) {
        this.scrollRafId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home" && state.headerEl) {
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
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Performance Optimization
    // Add passive: true flag to improve scroll performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Performance Optimization
    // Clean up event listener and pending animation frames to prevent memory leaks
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
