<script>
export default {
  name: "AppHeader",
}
</script>

<template>
<header class="position-sticky top-0 start-0">
  <nav class="navbar navbar-expand-md navbar-dark bg-black">
    <div class="container">
      <router-link class="text-decoration-none" :to="{ name: 'home' }">
        <div class="app_logo">$ > Boolfolio</div>
      </router-link>
    </div>
  </nav>
</header>
</template>
