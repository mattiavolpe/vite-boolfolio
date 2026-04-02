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
    this.ticking = false;
    this.scrollHandler = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };
  },
  methods: {
    handleScroll() {
      if(this.$route.name === "home" && state.headerEl) {
        const footerY = state.footerEl ? state.footerEl.getBoundingClientRect().y : Infinity;
        const projectsY = state.projectsSectionEl ? state.projectsSectionEl.getBoundingClientRect().y : Infinity;
        const skillsY = state.skillsSectionEl ? state.skillsSectionEl.getBoundingClientRect().y : Infinity;
        const aboutY = state.aboutSectionEl ? state.aboutSectionEl.getBoundingClientRect().y : Infinity;

        if(footerY <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(projectsY <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if(skillsY <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(aboutY <= 65) {
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
  },
  mounted() {
    // ⚡ Bolt: Use { passive: true } for better scroll performance and requestAnimationFrame to throttle
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Remove event listener on unmount to prevent memory leaks
    window.removeEventListener('scroll', this.scrollHandler);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
