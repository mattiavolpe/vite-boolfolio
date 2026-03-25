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
    // ⚡ Bolt: Throttled scroll handler using requestAnimationFrame to prevent main thread blocking
    handleScroll() {
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.checkSections();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    },
    checkSections() {
      if(this.$route.name === "home") {
        if(state.footerEl && state.footerEl.getClientRects()[0].y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.projectsSectionEl && state.projectsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if(state.skillsSectionEl && state.skillsSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if(state.aboutSectionEl && state.aboutSectionEl.getClientRects()[0].y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else {
          if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
        }
      } else {
        if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Added passive flag for better scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  // ⚡ Bolt: Cleanup to prevent memory leaks and unnecessary processing on other views
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
