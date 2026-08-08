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
    this._scrollTicking = false;
    this._scrollHandler = () => {
      if (!this._scrollTicking) {
        this._scrollRafId = requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // Optimization: Use getBoundingClientRect for better performance and optional chaining for safety
            if (state.footerEl?.getBoundingClientRect().y <= 90) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if (state.projectsSectionEl?.getBoundingClientRect().y <= 65) {
              state.headerEl?.classList.remove("bg_dark_custom");
              state.headerEl?.classList.add("bg_dark_blue_custom");
            } else if (state.skillsSectionEl?.getBoundingClientRect().y <= 65) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if (state.aboutSectionEl?.getBoundingClientRect().y <= 65) {
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
          this._scrollTicking = false;
        });
        this._scrollTicking = true;
      }
    };

    // Optimization: Use passive listener to prevent main thread blocking
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // Prevent memory leaks
    window.removeEventListener('scroll', this._scrollHandler);
    if (this._scrollRafId) cancelAnimationFrame(this._scrollRafId);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
