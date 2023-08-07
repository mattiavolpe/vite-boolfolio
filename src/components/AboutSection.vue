<!-- #303036 -->
<script>
import SectionTitle from './SectionTitle.vue';
import { state } from '../state';
export default {
  name: "AboutSection",
  components: {
    SectionTitle,
  },
  data() {
    return {
      state,
    }
  },
  mounted() {
    state.aboutSectionEl = document.getElementById("aboutSection");
  }
}
</script>

<template>
  <section id="aboutSection" class="pb-5">
    <div class="container">
      <SectionTitle>About me</SectionTitle>
      <div class="d-flex align-items-start gap-3">
        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7">
          <path id="Layer1" class="s0" d="m2 1.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
          <path id="Layer2" class="s0" d="m7 1.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
          <path id="Layer3" class="s0" d="m12 1.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
          <path id="Layer4" class="s0" d="m2 5.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
          <path id="Layer5" class="s0" d="m7 5.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
          <path id="Layer6" class="s0" d="m12 5.5c0 0.3-0.2 0.5-0.5 0.5-0.3 0-0.5-0.2-0.5-0.5 0-0.3 0.2-0.5 0.5-0.5 0.3 0 0.5 0.2 0.5 0.5z"/>
        </svg>
        <p>
        Hi everyone! I'm <span class="text_accent_custom fw-bold">Mattia</span> and, as I've already spoilered above, I'm a <span class="text_accent_custom fw-bold">Full-Stack Web Developer</span>.
          <br>
          I started by first studying in mid December 2022, as self-taught on <span class="text_accent_custom fw-bold">The Odin Project</span> and then, since the end of January 2023, I started following a 6 month course on the <span class="text_accent_custom fw-bold">Boolean Academy</span> (the best educational choice ever taken in my life).
          <br>
          This is my <span class="text_accent_custom fw-bold">Portfolio</span> with some of the things I realized during my studies and other personal projects.
          <br>
          Hope you like them!
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_AboutSection.scss";
</style>
