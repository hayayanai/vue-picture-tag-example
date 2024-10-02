<script setup lang="ts">
import { computed } from 'vue'

const { src, alt } = defineProps<{
  src: string
  alt?: string
}>()

const srcPath = computed<string>(() => {
  return import.meta.env.BASE_URL + src.replace(/\.\w+$/, '')
})
</script>

<template>
  <picture>
    <source type="image/avif" :srcset="`${srcPath}.avif`" />
    <source type="image/webp" :srcset="`${srcPath}.webp`" />
    <img :src="`${srcPath}.png`" :alt="alt" :class="$attrs.class" />
  </picture>
</template>
