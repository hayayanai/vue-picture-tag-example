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
    <slot name="source-avif">
      <source type="image/avif" :srcset="`${srcPath}.avif`" />
    </slot>
    <slot name="source-webp">
      <source type="image/webp" :srcset="`${srcPath}.webp`" />
    </slot>
    <slot name="img">
      <img :src="`${srcPath}.png`" :alt="alt" :class="$attrs.class" />
    </slot>
    <slot></slot>
  </picture>
</template>
