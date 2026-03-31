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
    // ⚡ Bolt: Initialize non-reactive state to avoid Vue reactivity overhead
    this.ticking = false;
    this.handleScrollBound = this.handleScroll.bind(this);
  },
  mounted() {
    // ⚡ Bolt: Use { passive: true } to prevent main thread blocking during scroll.
    // Impact: Smooth 60fps scrolling without jank.
    window.addEventListener('scroll', this.handleScrollBound, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Remove event listener to prevent memory leaks across route changes
    window.removeEventListener('scroll', this.handleScrollBound);
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttle DOM layout measurements with requestAnimationFrame.
      // Impact: Reduces heavy DOM calculations from ~100 times per scroll to just ~1 time per frame (16ms).
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderBg();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    updateHeaderBg() {
      if(this.$route.name === "home") {
        if (!state.headerEl) return;

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
        if (state.headerEl) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
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
