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
      scrollListener: null,
      scrollTicking: false
    }
  },
  mounted() {
    // ⚡ Bolt Performance Optimization: Throttled scroll listener with requestAnimationFrame
    // and passive flag to prevent main thread blocking during scroll events.
    this.scrollListener = () => {
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt Performance Optimization: Clean up global listener to prevent memory leaks
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  },
  methods: {
    handleScroll() {
      if(this.$route.name === "home") {
        // ⚡ Bolt Performance Optimization: Use optional chaining and getBoundingClientRect()
        // which is slightly faster and safer than getClientRects()[0]
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
