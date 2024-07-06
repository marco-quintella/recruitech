<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router'

defineProps<{
  to?: RouteLocationRaw
}>()
</script>

<template>
  <nuxt-link :to text-primary-text font-bold underline-2 underline-offset-8 hover:underline>
    <slot />
  </nuxt-link>
</template>
