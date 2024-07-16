<script setup lang="ts">
const props = withDefaults(defineProps<{
  color1?: 'primary' | 'secondary'
  color2?: 'primary' | 'secondary' | 'primary-text'
}>(), {
  color1: 'secondary',
  color2: 'primary',
})

const src = `/logo-${props.color1}-${props.color2}.svg`
</script>

<template>
  <img :src="src" class="h-6">
</template>

<style lang="sass">

</style>
