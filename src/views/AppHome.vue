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
    // ⚡ Bolt: Initialize purely internal state (non-reactive) to avoid reactivity tracking overhead.
    this.ticking = false;
    this.rafId = null;
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        // ⚡ Bolt: Throttle DOM measurements using requestAnimationFrame to sync with the browser's paint cycle,
        // reducing main thread blocking and preventing layout thrashing during scroll.
        this.rafId = window.requestAnimationFrame(() => {
          if (this.$route.name === "home") {
            if (state.footerEl && state.footerEl.getBoundingClientRect().y <= 90) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if (state.projectsSectionEl && state.projectsSectionEl.getBoundingClientRect().y <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else if (state.skillsSectionEl && state.skillsSectionEl.getBoundingClientRect().y <= 65) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if (state.aboutSectionEl && state.aboutSectionEl.getBoundingClientRect().y <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else {
              if(state.headerEl) {
                state.headerEl.classList.remove("bg_dark_blue_custom");
                state.headerEl.classList.add("bg_dark_custom");
              }
            }
          } else {
            if(state.headerEl) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            }
          }
          this.ticking = false;
        });
        this.ticking = true;
      }
    }
  },
  mounted() {
    // ⚡ Bolt: Add { passive: true } to inform the browser we won't call preventDefault(), allowing smooth scrolling.
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Prevent memory leaks across page navigations by removing the listener and pending animation frames.
    window.removeEventListener('scroll', this.handleScroll);
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
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
