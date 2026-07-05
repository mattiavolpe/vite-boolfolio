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
  methods: {
    handleScroll() {
      // ⚡ Bolt: Added null-safety checks for global DOM elements
      if(!state.headerEl) return;

      if(this.$route.name === "home" && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
        // ⚡ Bolt: Replaced getClientRects()[0].y with the more efficient getBoundingClientRect().top
        if(state.footerEl.getBoundingClientRect().top <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.projectsSectionEl.getBoundingClientRect().top <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if(state.skillsSectionEl.getBoundingClientRect().top <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.aboutSectionEl.getBoundingClientRect().top <= 65) {
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
    // ⚡ Bolt: Throttled scroll listener with requestAnimationFrame to prevent main thread blocking
    this._scrollHandler = () => {
      if (this._ticking) return;
      this._ticking = true;
      this._rafId = window.requestAnimationFrame(() => {
        this.handleScroll();
        this._ticking = false;
      });
    };
    // ⚡ Bolt: Used passive: true for better scrolling performance
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Clean up event listener and cancel animation frames to prevent memory leaks
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
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
