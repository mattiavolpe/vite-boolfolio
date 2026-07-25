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
  methods: {
    handleScroll() {
      // ⚡ Bolt: Use requestAnimationFrame to throttle the scroll event handler,
      // reducing main thread blocking and improving rendering performance.
      if (this.scrollTicking) return;

      this.scrollTicking = true;
      this.scrollFrameId = requestAnimationFrame(() => {
        if(this.$route.name === "home" && state.headerEl) {
          // ⚡ Bolt: Use getBoundingClientRect() instead of getClientRects()[0] for better performance.
          // Also added optional chaining to prevent null reference errors if elements aren't mounted.
          if(state.footerEl?.getBoundingClientRect().y <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl?.getBoundingClientRect().y <= 65) {
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
        this.scrollTicking = false;
      });
    }
  },
  mounted() {
    this.scrollTicking = false;
    this.scrollFrameId = null;
    // ⚡ Bolt: Add { passive: true } to the scroll listener to prevent main thread blocking
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Clean up the event listener and animation frame to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollFrameId) {
      cancelAnimationFrame(this.scrollFrameId);
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
