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
    this.handleScroll = () => {
      if (this.scrollTicking) return;
      this.scrollTicking = true;
      requestAnimationFrame(() => {
        // Optimization: Use getBoundingClientRect() and optional chaining for safer, faster layout reads
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
        this.scrollTicking = false;
      });
    };
    // Optimization: passive listener prevents main thread blocking
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Optimization: Clean up global event listeners to prevent memory leaks
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
