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
      scrollFrameId: null,
    }
  },
  mounted() {
    // ⚡ Bolt Optimization: Extract handler to throttle via requestAnimationFrame
    this.scrollHandler = () => {
      if (this.scrollFrameId) return;
      this.scrollFrameId = window.requestAnimationFrame(() => {
        this.handleScroll();
        this.scrollFrameId = null;
      });
    };
    // ⚡ Bolt Optimization: Use passive listener to prevent main thread blocking
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt Optimization: Clean up global listener to prevent memory leaks
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.scrollFrameId) {
      window.cancelAnimationFrame(this.scrollFrameId);
    }
  },
  methods: {
    handleScroll() {
      if(this.$route.name === "home") {
        // ⚡ Bolt Optimization: Use optional chaining and getBoundingClientRect() over getClientRects()[0]
        if(state.footerEl?.getBoundingClientRect().y <= 90) {
          state.headerEl?.classList.remove("bg_dark_blue_custom");
          state.headerEl?.classList.add("bg_dark_custom");
        } else if(state.projectsSectionEl?.getBoundingClientRect().y <= 65) {
          state.headerEl?.classList.remove("bg_dark_custom");
          state.headerEl?.classList.add("bg_dark_blue_custom");
        } else if(state.skillsSectionEl?.getBoundingClientRect().y <= 65) {
          state.headerEl?.classList.remove("bg_dark_blue_custom");
          state.headerEl?.classList.add("bg_dark_custom");
        } else if(state.aboutSectionEl?.getBoundingClientRect().y <= 65) {
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
