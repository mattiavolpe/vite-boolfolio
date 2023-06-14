<script>
export default {
  name: "PageNotFound",
}
</script>

<template>
  <div class="position-fixed start-50 top-50 translate-middle py-5 text-center text_custom_green">
    <h1>404 | NOT FOUND</h1>
    <router-link class="text_custom_green" :to="{ name: 'home' }">Go back to HOME</router-link>
  </div>
</template>
