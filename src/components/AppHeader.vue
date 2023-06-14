<script>
export default {
  name: "AppHeader",
}
</script>

<template>
<header class="position-sticky top-0 start-0">
  <nav class="navbar navbar-expand-md navbar-dark bg-black">
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <div class="app_logo">$ > Boolfolio</div>
      </router-link>
      <a class="navbar-brand me-0 d-flex align-items-center" href="/">
        sdfafdsf
      </a>
    </div>
  </nav>
</header>
</template>
