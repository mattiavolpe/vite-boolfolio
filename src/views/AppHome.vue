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
      scrollHandler: null,
      animationFrameId: null,
    }
  },
  mounted() {
    // 💡 What: Extracted scroll handler, added throttling via requestAnimationFrame, used getBoundingClientRect().top, and { passive: true }
    // 🎯 Why: Prevents main thread blocking and layout trashing from high-frequency scroll events
    this.scrollHandler = () => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.animationFrameId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // Used getBoundingClientRect().top over getClientRects()[0].y for better efficiency
          if(state.footerEl.getBoundingClientRect().top <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl.getBoundingClientRect().top <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl.getBoundingClientRect().top <= 65) {
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
      });
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // 💡 What: Added global scroll event listener cleanup and cancelled pending animation frames
    // 🎯 Why: Prevents memory leaks and unintended executions across different routes
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
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
