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
      // Use requestAnimationFrame for throttling scroll events to prevent main thread blocking
      if (!this._scrollTicking) {
        this._scrollTicking = true;
        this._scrollFrameId = requestAnimationFrame(() => {
          if(this.$route.name === "home") {
            // Using getBoundingClientRect() over getClientRects()[0] for better performance
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
          } else {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          this._scrollTicking = false;
        });
      }
    }
  },
  mounted() {
    this._scrollTicking = false;
    // Add passive: true flag to optimize scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Clean up event listener and pending animation frames to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this._scrollFrameId) {
      cancelAnimationFrame(this._scrollFrameId);
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
