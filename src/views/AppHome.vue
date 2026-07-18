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
    // ⚡ Bolt: Optimize scroll event by using requestAnimationFrame for throttling, passive event listener to prevent main thread blocking, and getBoundingClientRect() over getClientRects()[0] for efficiency. Also adding optional chaining to prevent null reference errors.
    this.handleScroll = () => {
      if (this.scrollTimeout) return;

      this.scrollTimeout = requestAnimationFrame(() => {
        if (this.$route.name === "home") {
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
        } else {
          state.headerEl?.classList.remove("bg_dark_blue_custom");
          state.headerEl?.classList.add("bg_dark_custom");
        }

        this.scrollTimeout = null;
      });
    };

    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
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
