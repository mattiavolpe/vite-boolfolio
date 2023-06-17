<script>
import { state } from '../state';
export default {
  name: "AppJumbotron",
  data() {
    return {
      state
    }
  }
}
</script>

<template>
  <section id="homeJumbotron">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 align-items-center py-3">
        <div id="jumboLeftSection" class="col">
          <h1>Hey, I'm <span class="text_accent_custom fw-bold">Mattia Volpe</span></h1>
          <h4 class="my-2">Junior (for now <span class="text_accent_custom">&smile;</span>) <br>Full-Stack Web Developer</h4>
          <router-link :to="{name: 'contacts'}" class="d-block text_accent_custom text-decoration-none rounded fw-medium">Contact me</router-link>
        </div>
        <div id="jumboRightSection" class="col d-flex justify-content-center align-items-center py-4">
          <div id="avatarWrapper">
            <img class="img-fluid" :src="state.getImageUrl('avatar_optimized.png')" alt="Mattia Volpe's Avatar">
          </div>
        </div>
      </div>
    </div>
    <div id="scrollDownWrapper" class="text-center py-2">
      <a href="#aboutSection">
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="fa-4x text_accent_custom"/>
      </a>
    </div>
  </section>
</template>
