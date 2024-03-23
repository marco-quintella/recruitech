<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button :disabled="disabled">
    <slot />
  </button>
</template>

<style lang="sass" scoped>
button
  @apply b-rd-3 px-4 py-2 text-4 text-bold
  @apply transition-all flex items-center

  &[disabled]
    @apply cursor-not-allowed opacity-60

  &[primary]
    @apply bg-primary text-primary-text
    @apply b-2 b-solid b-primary-dark

    &:hover:not([disabled])
      @apply bg-primary-light

    &:active:not([disabled])
      @apply bg-primary-dark

  &[secondary]
    @apply bg-secondary text-secondary-text
    @apply b-2 b-solid b-secondary-dark

    &:hover:not([disabled])
      @apply bg-secondary-light

    &:active:not([disabled])
      @apply bg-secondary-dark
</style>
