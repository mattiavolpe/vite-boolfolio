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
    this._handleScroll = () => {
      if (!this._scrollTicking) {
        // Optimization: Use requestAnimationFrame for throttling scroll events to prevent main thread blocking
        // Expected impact: Eliminates layout thrashing and ensures smooth 60fps scrolling
        this._scrollAnimationId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // Optimization: Use getBoundingClientRect() over getClientRects()[0] for efficiency
            // Also use optional chaining to prevent null reference errors if component unmounts
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

    // Optimization: Assign non-reactive tracking variables directly to instance to prevent Vue reactivity overhead
    this._scrollTicking = false;
    // Optimization: Add { passive: true } to prevent scroll blocking
    window.addEventListener('scroll', this._handleScroll, { passive: true });
  },
  unmounted() {
    // Optimization: Cleanup event listeners and pending frames to prevent memory leaks
    window.removeEventListener('scroll', this._handleScroll);
    if (this._scrollAnimationId) {
      window.cancelAnimationFrame(this._scrollAnimationId);
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
