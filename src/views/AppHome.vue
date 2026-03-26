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
      scrollTicking: false,
    }
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttled scroll event using requestAnimationFrame to prevent layout thrashing
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderBackground();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    },
    updateHeaderBackground() {
      if(this.$route.name === "home") {
        if(state.footerEl && state.footerEl.getClientRects()[0] && state.footerEl.getClientRects()[0].y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.projectsSectionEl && state.projectsSectionEl.getClientRects()[0] && state.projectsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if(state.skillsSectionEl && state.skillsSectionEl.getClientRects()[0] && state.skillsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.aboutSectionEl && state.aboutSectionEl.getClientRects()[0] && state.aboutSectionEl.getClientRects()[0].y <= 65) {
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
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    // ⚡ Bolt: Remove global event listener to prevent memory leaks on route changes
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
