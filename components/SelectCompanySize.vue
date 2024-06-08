<script lang="ts" setup>
const model = defineModel<CompanySize | null>()
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

<style>

</style>
