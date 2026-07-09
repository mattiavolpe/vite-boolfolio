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
    // ⚡ Bolt Optimization: Throttled scroll listener using requestAnimationFrame and passive flag
    // Also using getBoundingClientRect() for efficiency and preventing memory leaks on unmount.
    this._ticking = false;
    this._scrollHandler = () => {
      if (!this._ticking) {
        this._ticking = true;
        this._rAFId = window.requestAnimationFrame(() => {
          if(this.$route.name === "home") {
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
            } else if(state.headerEl) {
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
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._rAFId) {
      window.cancelAnimationFrame(this._rAFId);
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
