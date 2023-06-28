<script>
import { state } from '../state';
export default {
  name: "AppHeader",
  data() {
    return {
      state,
    }
  },
  mounted() {
    state.headerEl = document.getElementById("appHeader");
  }
}
</script>

<template>
  <header id="appHeader" class="position-sticky top-0 start-0 py-3 bg_dark_custom">
    <nav class="navbar navbar-expand-md p-0">
      <div class="container">
        <router-link :to="{name: 'home'}" class="navbar-brand p-0">
          <img height="50" :src="state.getImageUrl('logo_light_optimized.png')" alt="MV Site Logo">
        </router-link>
        <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle menu">
          <font-awesome-icon icon="fa-solid fa-bars" class="fa-xl text_light_custom" />
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav text-center ms-auto">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link text_light_custom fw-medium" aria-current="page">Home<span class="visually-hidden">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'projects'}" class="nav-link text_light_custom fw-medium" aria-current="page">Projects</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'contact'}" class="nav-link text_light_custom fw-medium" aria-current="page">Contact me</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_AppHeader.scss";
</style>
