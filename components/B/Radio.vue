<script setup lang="ts">
defineProps<{
  label?: string
  value: any
  disabled?: boolean
  name?: string
}>()

const model = defineModel()
</script>

<template>
  <div flex cursor-pointer items-center gap-1>
    <input v-model="model" :value="value" type="radio" :name="name">
    <label v-if="label" :for="name">{{ label }}</label>
  </div>
</template>

<style lang="sass">
input[type="radio"]
  @apply mt-0.5 cursor-pointer w-4 h-4

  &[disabled]
    @apply important-cursor-not-allowed
</style>
