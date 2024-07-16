<script lang="ts" setup>
const model = defineModel<typeof remoteTypeOptions>({ default: [] })

function onAdd(remoteType: typeof remoteTypeOptions[0]) {
  if (model.value.includes(remoteType))
    return
  model.value.push(remoteType)
}
</script>

<template>
  <q-btn color="primary" dense unelevated label="Modalidade">
    <q-menu max-height="350px" flex flex-col gap-2 overflow-hidden p-2>
      <div flex justify-between gap-4>
        <span font-bold>Modalidade</span>

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
          v-for="remoteType in remoteTypeOptions"
          :key="remoteType.value"
          v-ripple
          v-close-popup
          clickable
          dense
          @click="onAdd(remoteType)"
        >
          <q-item-section>
            {{ remoteType.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
