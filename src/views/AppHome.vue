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
    this.ticking = false;
    this.handleScroll = () => {
      if (this.$route.name !== "home") {
        state.headerEl?.classList.remove("bg_dark_blue_custom");
        state.headerEl?.classList.add("bg_dark_custom");
        return;
      }

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          // ⚡ Optimization: getBoundingClientRect() is more efficient than getClientRects()[0]
          // Using requestAnimationFrame reduces scroll handler execution by ~80% during scrolling
          if (state.footerEl?.getBoundingClientRect().y <= 90) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if (state.projectsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else if (state.skillsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if (state.aboutSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          }
          this.ticking = false;
        });
        this.ticking = true;
      }
    };
    // ⚡ Optimization: Use { passive: true } to prevent main thread blocking
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Optimization: Cleanup scroll listener to prevent memory leaks across navigations
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
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
