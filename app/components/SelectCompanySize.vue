<script lang="ts" setup>
import type { companySize } from '@prisma/client'

const model = defineModel<companySize | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="companySizeOptions"
    label="Tamanho da Empresa"
    emit-value
    dense
    outlined
    map-options
  />
</template>
