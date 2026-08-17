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
    checkScroll() {
      if (this.$route.name !== "home") {
        state.headerEl?.classList.remove("bg_dark_blue_custom");
        state.headerEl?.classList.add("bg_dark_custom");
        this._scrollTicking = false;
        return;
      }

      // Optimization: Use getBoundingClientRect() to avoid TypeErrors and safely read DOM Rects
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
      this._scrollTicking = false;
    },
    handleScroll() {
      // Optimization: Throttle scroll event with requestAnimationFrame to unblock main thread
      if (!this._scrollTicking) {
        window.requestAnimationFrame(() => this.checkScroll());
        this._scrollTicking = true;
      }
    }
  },
  mounted() {
    this._scrollTicking = false;
    this._boundHandleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this._boundHandleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this._boundHandleScroll);
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
</template>
