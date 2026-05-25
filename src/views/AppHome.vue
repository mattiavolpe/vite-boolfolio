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
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderState();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    },
    updateHeaderState() {
      if (this.$route.name !== "home" || !state.headerEl) {
        if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
        return;
      }

      // Safe get bounding client rect y position
      const getY = (el) => el ? el.getBoundingClientRect().y : Infinity;

      if (state.footerEl && getY(state.footerEl) <= 90) {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      } else if (state.projectsSectionEl && getY(state.projectsSectionEl) <= 65) {
        state.headerEl.classList.remove("bg_dark_custom");
        state.headerEl.classList.add("bg_dark_blue_custom");
      } else if (state.skillsSectionEl && getY(state.skillsSectionEl) <= 65) {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      } else if (state.aboutSectionEl && getY(state.aboutSectionEl) <= 65) {
        state.headerEl.classList.remove("bg_dark_custom");
        state.headerEl.classList.add("bg_dark_blue_custom");
      } else {
        state.headerEl.classList.remove("bg_dark_blue_custom");
        state.headerEl.classList.add("bg_dark_custom");
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
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
