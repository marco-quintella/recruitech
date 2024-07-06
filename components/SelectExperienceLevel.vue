<script lang="ts" setup>
const options = [
  {
    label: 'Junior',
    value: ExperienceLevelEnum.entry,
  },
  {
    label: 'Pleno',
    value: ExperienceLevelEnum.intermediate,
  },
  {
    label: 'Senior',
    value: ExperienceLevelEnum.senior,
  },
]

const model = defineModel<ExperienceLevel | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="options"
    label="Nível de Experiência"
    emit-value
    dense
    outlined
    map-options
  />
</template>

<style>

</style>
