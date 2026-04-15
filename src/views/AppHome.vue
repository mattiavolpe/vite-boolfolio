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
    // ⚡ Bolt: Optimize scroll performance by using non-reactive variables for scroll state
    this.scrollTicking = false;
    this.rafId = null;
    // ⚡ Bolt: Throttle scroll event handling using requestAnimationFrame to sync with browser paint cycle
    this.scrollHandler = () => {
      if (!this.scrollTicking) {
        this.rafId = requestAnimationFrame(() => {
          this.handleScroll();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    };
  },
  methods: {
    handleScroll() {
      if(this.$route.name === "home") {
        if (state.headerEl) {
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
        }
      } else {
        if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Add { passive: true } to prevent blocking the main thread during scrolling
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Prevent memory leaks and background processing by removing listeners on unmount
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
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
