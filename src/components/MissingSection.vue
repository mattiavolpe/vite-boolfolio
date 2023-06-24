<script>
export default {
  name: "MissingSection",
}
</script>

<template>
  <h4 class="text_light_custom text-center mb-0 fw-normal">
          <font-awesome-icon icon="fa-regular fa-hourglass" class="hourglass" />
          <slot></slot>
        </h4>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_MissingSection.scss";
</style>
