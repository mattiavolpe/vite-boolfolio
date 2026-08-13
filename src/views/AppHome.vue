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
    handleScroll() {
      // ⚡ Bolt: Throttled scroll event using requestAnimationFrame to prevent layout thrashing
      // Expected impact: smoother scrolling performance, reduced main thread blocking
      if (!this._scrollTicking) {
        window.requestAnimationFrame(() => {
          if(this.$route.name === "home") {
            // ⚡ Bolt: Using getBoundingClientRect for safety and optional chaining to prevent TypeErrors
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
          this._scrollTicking = false;
        });
        this._scrollTicking = true;
      }
    }
  },
  mounted() {
    this._scrollTicking = false;
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
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
