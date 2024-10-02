<script setup lang="ts">
import MultiFormatImage from './MultiFormatImage.vue'
</script>

<template>
  <MultiFormatImage
    src="assets/images/l_01_square_white.png"
    alt="square white sample image"
    class="pic"
  />
  <MultiFormatImage
    src="assets/images/l_02_rectangle_white.png"
    alt="rectangle white sample image"
    class="pic"
  />
</template>

<style scoped>
:deep(.pic) {
  width: 100%;
  height: auto;
}
</style>
