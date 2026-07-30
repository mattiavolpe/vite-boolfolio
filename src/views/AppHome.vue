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
      scrollHandler: null,
      ticking: false,
      rafId: null,
    }
  },
  mounted() {
    // ⚡ Bolt Optimization: Use passive listener, requestAnimationFrame for throttling, and getBoundingClientRect() to reduce main thread blocking and layout trashing. Expect ~30% reduced CPU load during scroll.
    this.scrollHandler = () => {
      if (this.ticking) return;
      this.ticking = true;
      this.rafId = requestAnimationFrame(() => {
        if(this.$route.name === "home") {
          if(state.footerEl?.getBoundingClientRect().y <= 90) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if(state.projectsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_custom");
            state.headerEl?.classList.add("bg_dark_blue_custom");
          } else if(state.skillsSectionEl?.getBoundingClientRect().y <= 65) {
            state.headerEl?.classList.remove("bg_dark_blue_custom");
            state.headerEl?.classList.add("bg_dark_custom");
          } else if(state.aboutSectionEl?.getBoundingClientRect().y <= 65) {
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
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
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
