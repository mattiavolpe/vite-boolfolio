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
    // Bolt Optimization: Throttled scroll listener using requestAnimationFrame and passive true
    this._scrollHandler = () => {
      if (!this._scrollTicking) {
        this._scrollTicking = true;
        window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // Null-safety check before accessing elements
            if (state.headerEl && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
              // Optimization: Use getBoundingClientRect().top instead of getClientRects()[0].y
              if (state.footerEl.getBoundingClientRect().top <= 90) {
                state.headerEl.classList.remove("bg_dark_blue_custom");
                state.headerEl.classList.add("bg_dark_custom");
              } else if (state.projectsSectionEl.getBoundingClientRect().top <= 65) {
                state.headerEl.classList.remove("bg_dark_custom");
                state.headerEl.classList.add("bg_dark_blue_custom");
              } else if (state.skillsSectionEl.getBoundingClientRect().top <= 65) {
                state.headerEl.classList.remove("bg_dark_blue_custom");
                state.headerEl.classList.add("bg_dark_custom");
              } else if (state.aboutSectionEl.getBoundingClientRect().top <= 65) {
                state.headerEl.classList.remove("bg_dark_custom");
                state.headerEl.classList.add("bg_dark_blue_custom");
              } else {
                state.headerEl.classList.remove("bg_dark_blue_custom");
                state.headerEl.classList.add("bg_dark_custom");
              }
            }
          } else if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          this._scrollTicking = false;
        });
      }
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
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
