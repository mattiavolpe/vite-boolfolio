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
        this._rafId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            const footerY = state.footerEl?.getBoundingClientRect().y;
            const projectsY = state.projectsSectionEl?.getBoundingClientRect().y;
            const skillsY = state.skillsSectionEl?.getBoundingClientRect().y;
            const aboutY = state.aboutSectionEl?.getBoundingClientRect().y;

            if (footerY !== undefined && footerY <= 90) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if (projectsY !== undefined && projectsY <= 65) {
              state.headerEl?.classList.remove("bg_dark_custom");
              state.headerEl?.classList.add("bg_dark_blue_custom");
            } else if (skillsY !== undefined && skillsY <= 65) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if (aboutY !== undefined && aboutY <= 65) {
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
        this._ticking = true;
      }
    };
    // Optimization: passive listener to unblock main thread and requestAnimationFrame for throttling
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimization: clean up scroll listener to prevent memory leak
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
