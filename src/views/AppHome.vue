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
  mounted() {
    // Optimization: Save handler reference to remove later, and use passive listener
    this._scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimization: Clean up event listener and any pending animation frame
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._scrollRafId) {
      cancelAnimationFrame(this._scrollRafId);
    }
  },
  methods: {
    handleScroll() {
      // Optimization: Throttle scroll event using requestAnimationFrame
      if (this._scrollRafId) return;

      this._scrollRafId = requestAnimationFrame(() => {
        this._scrollRafId = null;

        if(this.$route.name === "home") {
          // Optimization: Ensure elements exist and use getBoundingClientRect() over getClientRects()[0]
          if(state.headerEl && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
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
          }
        } else {
          if(state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        }
      });
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
