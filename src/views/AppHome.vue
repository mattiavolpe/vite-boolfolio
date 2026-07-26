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
      scrollTicking: false,
      boundScrollHandler: null,
    }
  },
  methods: {
    handleScroll() {
      // ⚡ Bolt: Throttle scroll events using requestAnimationFrame to prevent main thread blocking
      // Expected impact: smoother scrolling by decoupling DOM measurements from scroll event rate
      if (!this.scrollTicking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderBg();
          this.scrollTicking = false;
        });
        this.scrollTicking = true;
      }
    },
    updateHeaderBg() {
      // ⚡ Bolt: Use getBoundingClientRect() over getClientRects()[0] for better performance
      // Also adding optional chaining to prevent null reference errors if elements aren't rendered
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
    }
  },
  mounted() {
    this.boundScrollHandler = this.handleScroll.bind(this);
    // ⚡ Bolt: Use { passive: true } to inform the browser this listener won't call preventDefault,
    // which prevents scroll jank
    window.addEventListener('scroll', this.boundScrollHandler, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Cleanup global event listener to prevent memory leaks on route changes
    if (this.boundScrollHandler) {
      window.removeEventListener('scroll', this.boundScrollHandler);
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
