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
    let ticking = false;
    this.handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!state.headerEl) {
            ticking = false;
            return;
          }

          if(this.$route.name === "home") {
            // ⚡ Bolt: Use optional chaining and getBoundingClientRect() to avoid errors and layout thrashing
            const footerY = state.footerEl?.getBoundingClientRect().y ?? Infinity;
            const projectsY = state.projectsSectionEl?.getBoundingClientRect().y ?? Infinity;
            const skillsY = state.skillsSectionEl?.getBoundingClientRect().y ?? Infinity;
            const aboutY = state.aboutSectionEl?.getBoundingClientRect().y ?? Infinity;

            if(footerY <= 90) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if(projectsY <= 65) {
              state.headerEl.classList.remove("bg_dark_custom");
              state.headerEl.classList.add("bg_dark_blue_custom");
            } else if(skillsY <= 65) {
              state.headerEl.classList.remove("bg_dark_blue_custom");
              state.headerEl.classList.add("bg_dark_custom");
            } else if(aboutY <= 65) {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    // ⚡ Bolt: Optimize scroll listener with { passive: true } to prevent main thread blocking
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    // ⚡ Bolt: Clean up event listener to prevent memory leaks
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
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
