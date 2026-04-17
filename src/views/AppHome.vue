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
  // Initialize non-reactive variables to prevent unnecessary reactivity overhead
  created() {
    this.ticking = false;
    this.animationFrameId = null;
  },
  mounted() {
    // Attach listener with passive: true to optimize scrolling performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // Remove global event listener to prevent memory leaks on route changes
    window.removeEventListener('scroll', this.handleScroll);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        this.animationFrameId = requestAnimationFrame(() => {
          this.updateHeaderColor();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    updateHeaderColor() {
      // Safety checks before accessing DOM properties
      if (!state.headerEl) return;

      if(this.$route.name === "home") {
        // Use getBoundingClientRect() instead of getClientRects()[0] for better safety and convention
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
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
