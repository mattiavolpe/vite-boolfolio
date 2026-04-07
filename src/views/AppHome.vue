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
    this.scrollHandler = this.onScroll.bind(this);
    this.rafId = null;
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  },
  methods: {
    onScroll() {
      if (this.rafId !== null) {
        return;
      }
      this.rafId = requestAnimationFrame(() => {
        this.handleScroll();
        this.rafId = null;
      });
    },
    handleScroll() {
      // Add checks for element existence to prevent crashes if elements are not mounted yet
      if(this.$route.name === "home" && state.headerEl && state.footerEl && state.projectsSectionEl && state.skillsSectionEl && state.aboutSectionEl) {
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
      } else if (state.headerEl) {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
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
