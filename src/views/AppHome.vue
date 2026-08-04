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
  mounted() {
    this._scrollTicking = false;
    this._handleScroll = () => {
      if (!this._scrollTicking) {
        this._scrollTicking = true;
        this._scrollFrameId = window.requestAnimationFrame(() => {
          this._checkScroll();
          this._scrollTicking = false;
        });
      }
    };
    window.addEventListener('scroll', this._handleScroll, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this._handleScroll);
    if (this._scrollFrameId) {
      window.cancelAnimationFrame(this._scrollFrameId);
    }
  },
  methods: {
    _checkScroll() {
      // ⚡ Bolt Performance Optimization:
      // Throttling via requestAnimationFrame and passive event listener to prevent main thread blocking.
      // Using getBoundingClientRect() over getClientRects()[0] for better performance.
      // Cleaned up listener in unmounted() to fix memory leaks.
      // Expected impact: Eliminates layout thrashing, maintains 60 FPS scrolling, and prevents memory leaks.
      if(this.$route.name === "home") {
        const header = state.headerEl;
        if (!header) return;

        const footerY = state.footerEl?.getBoundingClientRect().y ?? Infinity;
        const projectsY = state.projectsSectionEl?.getBoundingClientRect().y ?? Infinity;
        const skillsY = state.skillsSectionEl?.getBoundingClientRect().y ?? Infinity;
        const aboutY = state.aboutSectionEl?.getBoundingClientRect().y ?? Infinity;

        if(footerY <= 90) {
          header.classList.remove("bg_dark_blue_custom");
          header.classList.add("bg_dark_custom");
        } else if(projectsY <= 65) {
          header.classList.remove("bg_dark_custom");
          header.classList.add("bg_dark_blue_custom");
        } else if(skillsY <= 65) {
          header.classList.remove("bg_dark_blue_custom");
          header.classList.add("bg_dark_custom");
        } else if(aboutY <= 65) {
          header.classList.remove("bg_dark_custom");
          header.classList.add("bg_dark_blue_custom");
        } else {
          header.classList.remove("bg_dark_blue_custom");
          header.classList.add("bg_dark_custom");
        }
      } else {
        const header = state.headerEl;
        if (header) {
          header.classList.remove("bg_dark_blue_custom");
          header.classList.add("bg_dark_custom");
        }
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
