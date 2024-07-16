<script lang="ts" setup>
const model = defineModel<{
  country?: string
  state?: string
  city?: string
}>({ default: {} })
</script>

<template>
  <div flex="~ col" gap-4>
    <q-select
      v-model="model.state"
      :options="estadosBrasil"
      option-label="nome"
      option-value="sigla"
      outlined
      dense
      map-options
      emit-value
      label="Estado"
    />
    <q-input
      v-model="model.city"
      label="Cidade"
      outlined
      dense
    />
  </div>
</template>

<style>

</style>
