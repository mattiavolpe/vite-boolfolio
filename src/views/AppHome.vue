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
    handleScroll() {
      // ⚡ Bolt: Use requestAnimationFrame for throttling scroll events
      if (!this.scrollTicking) {
        this.scrollRafId = window.requestAnimationFrame(() => {
          this.updateHeaderBackground();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    },
    updateHeaderBackground() {
      // ⚡ Bolt: Add null-safety checks and use getBoundingClientRect() for better performance
      if (!state.headerEl) return;

      if (this.$route.name === "home") {
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
      } else {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Add passive: true flag for scroll performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Cleanup global event listener and requestAnimationFrame to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollRafId !== null) {
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
