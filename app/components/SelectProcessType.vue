<script lang="ts" setup>
import { ProcessTypeEnum } from '~~/server/utils/enums'

const options = [
  {
    label: 'GetJobs.Tech',
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

const model = defineModel<ProcessTypeEnum | null>()
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
