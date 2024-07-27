<script lang="ts" setup>
import { ExperienceLevelEnum } from '~~/server/utils/enums'

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

const model = defineModel<ExperienceLevelEnum | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="options"
    label="Nível de Experiência"

    dense outlined emit-value map-options
  />
</template>=
