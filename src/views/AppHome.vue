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
    this._scrollHandler = () => {
      if (this._ticking) return;
      this._ticking = true;
      this._animationFrameId = requestAnimationFrame(() => {
        // Optimization: Throttled scroll listener using requestAnimationFrame, safe coordinate retrieval with getBoundingClientRect(), early route check, and null-safety
        if(this.$route.name === "home") {
          if(state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          }
        } else {
          state.headerEl?.classList.remove("bg_dark_blue_custom");
          state.headerEl?.classList.add("bg_dark_custom");
        }
        this._ticking = false;
      });
    };
    // Optimization: Add passive flag to scroll event to improve scroll performance
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimization: Clean up global scroll listener and animation frame to prevent memory leaks and duplicate firing
    window.removeEventListener('scroll', this._scrollHandler);
    if (this._animationFrameId) cancelAnimationFrame(this._animationFrameId);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
