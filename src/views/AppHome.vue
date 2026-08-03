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
    // ⚡ Bolt: Prevent reactivity overhead by attaching directly to instance
    this._scrollTicking = false;

    // ⚡ Bolt: Throttled scroll listener using requestAnimationFrame and passive flag
    // Impact: Prevents main thread blocking and layout thrashing during scroll events.
    this._scrollHandler = () => {
      if (!this._scrollTicking) {
        this._rafId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // ⚡ Bolt: Use optional chaining and getBoundingClientRect() for safety and better performance
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

    // ⚡ Bolt: Added passive: true to improve scroll performance
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Cleanup global event listener to prevent memory leaks
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
