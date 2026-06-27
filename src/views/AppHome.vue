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
    this._ticking = false;
    this._scrollHandler = () => {
      if (!this._ticking) {
        this._ticking = true;
        this._rafId = window.requestAnimationFrame(() => {
          // ⚡ Bolt: Throttled scroll event with requestAnimationFrame, using getBoundingClientRect() for better performance, and ensuring safety checks
          if(this.$route.name === "home" && state.headerEl) {
            const footerY = state.footerEl ? state.footerEl.getBoundingClientRect().y : Infinity;
            const projectsY = state.projectsSectionEl ? state.projectsSectionEl.getBoundingClientRect().y : Infinity;
            const skillsY = state.skillsSectionEl ? state.skillsSectionEl.getBoundingClientRect().y : Infinity;
            const aboutY = state.aboutSectionEl ? state.aboutSectionEl.getBoundingClientRect().y : Infinity;

            if(footerY <= 90) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if(projectsY <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else if(skillsY <= 65) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if(aboutY <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            }
          } else if(state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          this._ticking = false;
        });
      }
    };

    // ⚡ Bolt: Added passive: true for scroll performance
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Cleanup event listener and pending animation frames to prevent memory leaks
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
