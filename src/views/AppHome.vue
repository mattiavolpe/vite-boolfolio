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
    // ⚡ Bolt: Store non-reactive tracking variables in created() to avoid Vue's reactivity tracking overhead
    this.ticking = false;
    this.rafId = null;

    // ⚡ Bolt: Throttle rapid scroll events using requestAnimationFrame.
    // This prevents synchronous layout thrashing and limits executions to ~60 times per second.
    // Impact: Smooths scrolling by preventing main thread blockage.
    this.handleScroll = () => {
      if (!this.ticking) {
        this.rafId = window.requestAnimationFrame(() => {
          this.updateHeaderColor();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };
  },
  methods: {
    updateHeaderColor() {
      if (!state.headerEl) return;

      // ⚡ Bolt: Use getBoundingClientRect() instead of getClientRects()[0] for better performance and safety.
      // Combined with null checks, this prevents crashes if elements are unmounted or hidden during scroll.
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
    }
  },
  mounted() {
    // ⚡ Bolt: Use { passive: true } to tell the browser preventDefault() won't be called.
    // Impact: Greatly improves scrolling performance, especially on mobile.
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Prevent memory leaks by removing the event listener and cancelling pending RAFs
    // when the component unmounts (e.g. during route changes).
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
