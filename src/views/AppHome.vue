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
      // ⚡ Bolt: Prevent layout thrashing by throttling scroll event with requestAnimationFrame
      if (!this._scrollTicking) {
        window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            // ⚡ Bolt: Safely access bounding rects to prevent null reference errors on unmounted components
            if ((state.footerEl?.getBoundingClientRect().y ?? Infinity) <= 90) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if ((state.projectsSectionEl?.getBoundingClientRect().y ?? Infinity) <= 65) {
              state.headerEl?.classList.remove("bg_dark_custom");
              state.headerEl?.classList.add("bg_dark_blue_custom");
            } else if ((state.skillsSectionEl?.getBoundingClientRect().y ?? Infinity) <= 65) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if ((state.aboutSectionEl?.getBoundingClientRect().y ?? Infinity) <= 65) {
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
        // ⚡ Bolt: Track throttle flag on instance instead of data() to avoid reactivity overhead
        this._scrollTicking = true;
      }
    }
  },
  mounted() {
    this._scrollTicking = false;
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    // ⚡ Bolt: Prevent memory leaks by cleaning up global event listener on unmount
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
