<script lang="ts" setup>
const model = defineModel<typeof experienceLevelOptions>({ default: [] })

function onAdd(experienceLevel: typeof experienceLevelOptions[0]) {
  if (model.value.includes(experienceLevel))
    return
  model.value.push(experienceLevel)
}
</script>

<template>
  <q-btn color="primary" dense unelevated label="Experiência">
    <q-menu max-height="350px" flex flex-col gap-2 overflow-hidden p-2>
      <div flex justify-between gap-4>
        <span font-bold>Experiência</span>

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
          v-for="experienceLevel in experienceLevelOptions"
          :key="experienceLevel.value"
          v-ripple
          v-close-popup
          clickable
          dense
          @click="onAdd(experienceLevel)"
        >
          <q-item-section>
            {{ experienceLevel.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
