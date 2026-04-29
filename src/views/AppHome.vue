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
      // Store the scroll handler so we can remove it later to avoid memory leaks
      scrollHandler: null,
      // Store the requestAnimationFrame id so we can cancel it
      scrollRafId: null,
    }
  },
  mounted() {
    // Define the scroll handler with a requestAnimationFrame throttle to avoid blocking the main thread
    this.scrollHandler = () => {
      // Cancel the previous animation frame if there's one pending
      if (this.scrollRafId) {
        cancelAnimationFrame(this.scrollRafId);
      }

      this.scrollRafId = requestAnimationFrame(() => {
        // Skip execution if we're not on the home page or if state elements aren't initialized yet
        if (
          this.$route.name !== "home" ||
          !state.headerEl ||
          !state.footerEl ||
          !state.projectsSectionEl ||
          !state.skillsSectionEl ||
          !state.aboutSectionEl
        ) {
          if (state.headerEl) {
            state.headerEl.classList.remove("bg_dark_blue_custom");
            state.headerEl.classList.add("bg_dark_custom");
          }
          return;
        }

        // Use getBoundingClientRect() instead of getClientRects()[0] for better efficiency
        if (state.footerEl.getBoundingClientRect().y <= 90) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.projectsSectionEl.getBoundingClientRect().y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else if (state.skillsSectionEl.getBoundingClientRect().y <= 65) {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        } else if (state.aboutSectionEl.getBoundingClientRect().y <= 65) {
          state.headerEl.classList.remove("bg_dark_custom");
          state.headerEl.classList.add("bg_dark_blue_custom");
        } else {
          state.headerEl.classList.remove("bg_dark_blue_custom");
          state.headerEl.classList.add("bg_dark_custom");
        }
      });
    };

    // Add { passive: true } to the scroll listener to prevent main thread blocking
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    // Clean up the global event listener and any pending animation frames to prevent memory leaks
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
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
