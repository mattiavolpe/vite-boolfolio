<script>
export default {
  name: "SectionTitle",
}
</script>

<template>
  <h2 class="fw-bold text_accent_custom mb-5 text-uppercase text-center">
    <slot></slot>
  </h2>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 2rem;
}
</style>
