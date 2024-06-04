<script lang="ts" setup>
import { ContractTypeOptions } from '#imports'

const model = defineModel<typeof ContractTypeOptions>({ default: [] })

function onAdd(contractType: typeof ContractTypeOptions[0]) {
  if (model.value.includes(contractType))
    return
  model.value.push(contractType)
}
</script>

<template>
  <q-btn color="primary" dense unelevated label="Tipo de Contrato">
    <q-menu max-height="350px" flex flex-col gap-2 overflow-hidden p-2>
      <div flex justify-between gap-4>
        <span font-bold>Tipo de Contrato</span>

        <div
          v-close-popup cursor-pointer
          select-none text-primary
          hover:underline
          @click="model = []"
        >
          Limpar
        </div>
      </div>

      <q-separator />

      <q-list overflow-auto>
        <q-item
          v-for="contractType in ContractTypeOptions"
          :key="contractType.value"
          v-ripple
          v-close-popup
          clickable
          dense
          @click="onAdd(contractType)"
        >
          <q-item-section>
            {{ contractType.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
