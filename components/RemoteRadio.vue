<script lang="ts" setup>
const model = defineModel<RemoteType>()
</script>

<template>
  <div>
    <div font-600>
      Modelo
    </div>
    <div flex gap-4>
      <q-radio v-model="model" :val="RemoteTypeEnum.on_site" label="Presencial" />
      <q-radio v-model="model" :val="RemoteTypeEnum.hybrid" label="Híbrida" />
      <q-radio v-model="model" :val="RemoteTypeEnum.full_remote" label="Remota" />
    </div>
  </div>
</template>

<style>

</style>
