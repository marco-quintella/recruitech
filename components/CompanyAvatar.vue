<script lang="ts" setup>
defineProps<{ src?: string | null | undefined, name: string }>()
</script>

<template>
  <q-avatar rounded color="primary" text-color="primary-text">
    <img v-if="src" :src="src">
    <template v-else>
      {{ name }}
    </template>
  </q-avatar>
</template>
