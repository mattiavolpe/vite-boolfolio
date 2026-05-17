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
      ticking: false,
      animationFrameId: null,
    }
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        this.animationFrameId = window.requestAnimationFrame(() => {
          if(this.$route.name === "home") {
            // ⚡ Bolt Performance Optimization: Replace expensive getClientRects()[0] with getBoundingClientRect()
            // and throttle execution with requestAnimationFrame.
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
          } else if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          this.ticking = false;
        });
        this.ticking = true;
      }
    }
  },
  mounted() {
    // ⚡ Bolt Performance Optimization: Make listener passive to avoid blocking main thread scrolling
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt Performance Optimization: Clean up global listener and pending frames to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
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
