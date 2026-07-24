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
    this.scrollHandler = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Optimized scroll event with requestAnimationFrame throttling, { passive: true } to prevent main thread blocking,
      // getBoundingClientRect() for efficiency, and optional chaining to prevent null reference errors. Expected impact: reduced layout thrashing and smoother scrolling.
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
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
