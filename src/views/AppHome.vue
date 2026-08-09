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
    // ⚡ Bolt: Throttled scroll handler using requestAnimationFrame to prevent main thread blocking
    // Replaced expensive getClientRects()[0] with getBoundingClientRect() and added optional chaining
    // Expected impact: Smoother scrolling, zero jank, reduced CPU usage
    handleScroll() {
      if (!this._scrollTicking) {
        this._scrollTicking = true;
        this._scrollAnimationId = window.requestAnimationFrame(() => {
          this.updateHeaderState();
          this._scrollTicking = false;
        });
      }
    },
    updateHeaderState() {
      if(this.$route.name === "home") {
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
  },
  mounted() {
    this._scrollTicking = false;
    // ⚡ Bolt: Added passive flag to event listener to improve scroll performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Clean up event listeners and animations to prevent memory leaks
    window.removeEventListener('scroll', this.handleScroll);
    if (this._scrollAnimationId) {
      window.cancelAnimationFrame(this._scrollAnimationId);
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
