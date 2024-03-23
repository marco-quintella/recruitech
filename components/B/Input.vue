<script setup lang="ts">
defineProps<{
  label?: string
  required?: boolean
}>()

const model = defineModel()

const computedClass = computed(() => ({
  'has-value': !!model.value,
}))
</script>

<template>
  <div class="b-input" relative>
    <input v-model="model" :required="required" :class="computedClass">
    <span v-if="!!label" class="label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="sass">
.b-input
  @apply relative w-full

  input
    @apply bg-transparent outline-0 b-1 b-solid rd-3 #86868b px-3.8 pt-4.5 pb-1
    @apply text-#494949 text-ellipsis h-12 w-full b-primary-dark transition-all

    &:focus, &:focus-within, &:focus-visible
      @apply b-2 b-primary px-3.45

    &:focus-within + .label, &:focus + .label, &:valid[required] + .label, &.has-value + .label
      @apply top-0.6 text-3

  .label
    @apply absolute left-4 top-3 z-3 text-#6e6e73 transition-all
</style>
