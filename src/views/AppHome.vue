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
  created() {
    // ⚡ Bolt: Initialize purely internal, non-reactive state variables in the created() hook
    // rather than in data() to prevent unnecessary Vue reactivity tracking overhead.
    this.ticking = false;
    this.frameId = null;
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttling scroll events with requestAnimationFrame to ensure layout
      // measurements and DOM updates sync with the browser's paint cycle, reducing main thread jank.
      if (!this.ticking) {
        this.frameId = requestAnimationFrame(() => {
          if(this.$route.name === "home") {
            // ⚡ Bolt: Always use getBoundingClientRect().y instead of getClientRects()[0].y
            // to prevent runtime crashes if elements are hidden or unrendered. Also adding null checks
            // as child components might not have mounted yet.
            if(state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if(state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
              state.headerEl?.classList.remove("bg_dark_custom");
              state.headerEl?.classList.add("bg_dark_blue_custom");
            } else if(state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
              state.headerEl?.classList.remove("bg_dark_blue_custom");
              state.headerEl?.classList.add("bg_dark_custom");
            } else if(state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
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
          this.ticking = false;
        });
        this.ticking = true;
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Add scroll listener with { passive: true } to tell the browser
    // preventDefault() won't be called, making scrolling much smoother.
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Always remove global event listeners in unmounted() to prevent memory leaks
    // and redundant processing when the user navigates away from the home page.
    window.removeEventListener('scroll', this.handleScroll);
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
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
