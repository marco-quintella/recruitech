<script lang="ts" setup>
import type { CompanySizeEnum } from '~~/server/utils/enums'

const model = defineModel<CompanySizeEnum | null>()
</script>

<template>
  <q-select
    v-model="model"
    :options="companySizeOptions"
    label="Tamanho da Empresa"

    dense emit-value outlined map-options
  />
</template>
