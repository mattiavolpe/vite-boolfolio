<script>
import AppJumbotron from '../components/AppJumbotron.vue';
import AboutSection from '../components/AboutSection.vue';
export default {
  name: "AppHome",
  components: {
    AppJumbotron,
    AboutSection,
  }
}
</script>

<template>
  <AppJumbotron />
  <AboutSection />
</template>
