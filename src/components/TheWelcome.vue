<script setup lang="ts">
import VPicture from './VPicture.vue'
</script>

<template>
  <VPicture src="assets/images/l_01_square_white.png" alt="square white sample image" class="pic" />
  <VPicture
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
