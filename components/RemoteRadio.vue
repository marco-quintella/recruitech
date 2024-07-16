<script lang="ts" setup>
import { remoteType } from '@prisma/client'

const model = defineModel<remoteType>()
</script>

<template>
  <div>
    <div font-600>
      Modelo
    </div>
    <div flex gap-4>
      <q-radio v-model="model" :val="remoteType.on_site" label="Presencial" />
      <q-radio v-model="model" :val="remoteType.hybrid" label="Híbrida" />
      <q-radio v-model="model" :val="remoteType.full_remote" label="Remota" />
    </div>
  </div>
</template>
