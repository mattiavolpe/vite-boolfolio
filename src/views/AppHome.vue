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
  mounted() {
    this._scrollListener = () => {
      // ⚡ Bolt Optimization: Use requestAnimationFrame for scroll events
      // This prevents the callback from firing multiple times per frame,
      // reducing unnecessary computations and DOM reads.
      if (!this._scrollTicking) {
        window.requestAnimationFrame(() => {
          if(this.$route.name === "home") {
            // ⚡ Bolt Optimization: Use getBoundingClientRect() instead of getClientRects()[0]
            // This is safer as it always returns a DOMRect even if the element is not rendered.
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
          this._scrollTicking = false;
        });
        this._scrollTicking = true;
      }
    };
    window.addEventListener('scroll', this._scrollListener);
  },
  unmounted() {
    // ⚡ Bolt Optimization: Clean up the event listener on unmount
    window.removeEventListener('scroll', this._scrollListener);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
