<script lang="ts" setup>
import { experienceLevel } from '@prisma/client'

const options = [
  {
    label: 'Junior',
    value: experienceLevel.entry,
  },
  {
    label: 'Pleno',
    value: experienceLevel.intermediate,
  },
  {
    label: 'Senior',
    value: experienceLevel.senior,
  },
]

const model = defineModel<experienceLevel | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="options"
    label="Nível de Experiência"

    dense outlined emit-value map-options
  />
</template>=
