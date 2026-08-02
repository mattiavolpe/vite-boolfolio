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
    // Optimize: Extract handler to allow removal in unmounted(), preventing memory leaks
    this.scrollHandler = () => {
      // Optimize: Throttle with requestAnimationFrame to run only once per frame
      if (this.animationFrameId) return;
      this.animationFrameId = window.requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          // Optimize: Use optional chaining and getBoundingClientRect() for safety and efficiency
          if((state.footerEl?.getBoundingClientRect().top || 0) <= 90) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if((state.projectsSectionEl?.getBoundingClientRect().top || 0) <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else if((state.skillsSectionEl?.getBoundingClientRect().top || 0) <= 65) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if((state.aboutSectionEl?.getBoundingClientRect().top || 0) <= 65) {
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
        this.animationFrameId = null;
      });
    };
    // Optimize: Use passive listener to avoid blocking main thread scrolling
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // Optimize: Clean up global listener and animation frame to prevent memory leaks on route change
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
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
