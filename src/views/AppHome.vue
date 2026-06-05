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
    this._rafId = null;

    this._scrollHandler = () => {
      if (!this._ticking) {
        this._rafId = window.requestAnimationFrame(() => {
          if(this.$route.name === "home" && state.headerEl && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
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
          } else if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          this._ticking = false;
        });
        this._ticking = true;
      }
    };

    // Performance optimization: Use passive listener and throttle via rAF
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
    if (this._rafId !== null) {
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
