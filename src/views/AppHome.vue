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
  created() {
    // ⚡ Bolt: Initialize purely internal, non-reactive state variables here to prevent unnecessary reactivity tracking overhead.
    this.scrollFrameId = null;
    this.handleScroll = () => {
      // ⚡ Bolt: Throttle the listener using requestAnimationFrame to optimize scrolling performance.
      if (this.scrollFrameId) {
        window.cancelAnimationFrame(this.scrollFrameId);
      }
      this.scrollFrameId = window.requestAnimationFrame(() => {
        if(this.$route.name === "home" && state.headerEl) {
          // ⚡ Bolt: Safely query element positions using getBoundingClientRect() with null checks on DOM elements from state to prevent runtime crashes.
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
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        } else if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    };
  },
  mounted() {
    // ⚡ Bolt: Add { passive: true } to optimize scrolling performance by informing the browser that preventDefault() will not be called.
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Implement unmounted() hook to call cancelAnimationFrame and removeEventListener to prevent memory leaks and unintended execution across routes.
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollFrameId) {
      window.cancelAnimationFrame(this.scrollFrameId);
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
