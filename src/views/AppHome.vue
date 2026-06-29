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
    // ⚡ Bolt: Throttled scroll listener with requestAnimationFrame for performance
    // Uses passive: true and getBoundingClientRect() to avoid layout thrashing
    this._handleScroll = () => {
      if (this._ticking) return;
      this._ticking = true;

      this._scrollRafId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          if (state.headerEl && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
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
          }
        } else {
          if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        }
        this._ticking = false;
      });
    };

    window.addEventListener('scroll', this._handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Cleanup to prevent memory leaks during navigation
    window.removeEventListener('scroll', this._handleScroll);
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
