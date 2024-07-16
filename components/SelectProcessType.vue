<script lang="ts" setup>
import { processType } from '@prisma/client'

const options = [
  {
    label: 'GetJobs.Tech',
    value: processType.platform,
  },
  {
    label: 'Email',
    value: processType.email,
  },
  {
    label: 'Link',
    value: processType.link,
  },
]

const model = defineModel<processType | null>()
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
