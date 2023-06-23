<script>
import { state } from '../state';
import SectionTitle from './SectionTitle.vue';
export default {
  name: "AppFooter",
  components: {
    SectionTitle,
  },
  mounted() {
    state.footerEl = document.getElementById("appFooter");
  }
}
</script>

<template>
  <div id="appFooter" class="py-5">
    <div class="container text-center">
      <div class="row row-cols-1 row-cols-md-2 justify-content-center align-items-center gx-5 gy-3">
        <div class="col">
          <a href="https://github.com/mattiavolpe" target="_blank" id="github" class="d-flex justify-content-center justify-content-md-end align-items-center gap-3 text_light_custom">
            <font-awesome-icon icon="fa-brands fa-square-github" class="fa-2x" />
            <span>GitHub | mattiavolpe</span>
          </a>
        </div>
        <div class="col">
          <a href="https://www.linkedin.com/in/mattiavolpe" target="_blank" id="linkedin" class="d-flex justify-content-center justify-content-md-start align-items-center gap-3 text_light_custom">
            <font-awesome-icon icon="fa-brands fa-linkedin" class="fa-2x" />
            <span>LinkedIn | mattiavolpe</span>
          </a>
        </div>
      </div>
      <h6 class="mb-0 mt-3">
        Made with <span class="heart">&hearts;</span> by Mattia Volpe
        <br>
        Copyright &copy; 2023
      </h6>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_AppFooter.scss";
</style>
