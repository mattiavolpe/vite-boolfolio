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
      if (this.scrollTicking) return;

      this.scrollTicking = true;
      this.scrollFrame = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          if(state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_custom");
            state.headerEl.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
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
        this.scrollTicking = false;
      });
    }
  },
  mounted() {
    this.scrollTicking = false;
    this.scrollFrame = null;
    // ⚡ Bolt: Added passive listener and throttled with requestAnimationFrame for better scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Prevent memory leak
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
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
