<script lang="ts" setup>
const options = [
  {
    label: 'Recruitech',
    value: ProcessTypeEnum.platform,
  },
  {
    label: 'Email',
    value: ProcessTypeEnum.email,
  },
  {
    label: 'Link',
    value: ProcessTypeEnum.link,
  },
]

const model = defineModel<ProcessType | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="options"
    label="Tipo de processo"
    emit-value
    dense
    outlined
    map-options
  />
</template>

<style>

</style>
