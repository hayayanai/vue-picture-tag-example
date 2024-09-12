<script setup lang="ts">
import { computed } from 'vue'

const { src, alt } = defineProps<{
  src: string
  alt?: string
}>()

const srcPathWithoutExt = computed<string>(() => {
  return src.replace(/\.\w+$/, '')
})
</script>

<template>
  <picture>
    <slot name="source-avif">
      <source type="image/avif" :srcset="`${srcPathWithoutExt}.avif`" />
    </slot>
    <slot name="source-webp">
      <source type="image/webp" :srcset="`${srcPathWithoutExt}.webp`" />
    </slot>
    <slot name="img">
      <img :src="`${srcPathWithoutExt}.png`" :alt="alt" :class="$attrs.class" />
    </slot>
    <slot></slot>
  </picture>
</template>
