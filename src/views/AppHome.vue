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
      this.scrollFrame = window.requestAnimationFrame(() => {
        // Optimize scroll performance with requestAnimationFrame, passive listener, and optional chaining
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
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Clean up global listener and animation frame to prevent memory leaks
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
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
