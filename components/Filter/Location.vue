<script lang="ts" setup>
import type { Location } from '~/db/locations'
import type { GetLocationsResponse } from '~/server/services/locations/getLocations'

const model = defineModel<GetLocationsResponse[0]>()
const search = ref<string>()

const { data: locations, pending } = await useFetch<GetLocationsResponse>('/api/locations', {
  method: 'GET',
  query: {
    search: computed(() => search.value?.length ? search.value : undefined),
  },
})
</script>

<template>
  <q-btn color="primary" dense unelevated label="Localização">
    <q-menu flex flex-col gap-2 p-2>
      <div flex justify-between gap-4>
        <span font-bold>Localização</span>

        <div
          v-close-popup cursor-pointer
          select-none text-primary
          hover:underline
          @click="model = undefined"
        >
          Limpar
        </div>
      </div>

      <q-input
        v-model="search"
        dense
        outlined
        placeholder="Buscar localização"
        debounce="350"
        clearable
      />

      <q-separator />

      <q-list>
        <q-item
          v-for="location in locations"
          :key="location.id"
          v-ripple
          v-close-popup
          clickable
          dense
          @click="model = location"
        >
          <q-item-section v-if="location.country" avatar>
            <q-avatar square>
              <q-img :src="`https://flagsapi.com/${location.country}/flat/64.png`" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{
              [
                location.city,
                location.state,
                location.country,
              ].filter(Boolean).join(', ')
            }}
          </q-item-section>
        </q-item>
        <q-item v-if="!locations.length" dense>
          Nenhum resultado
        </q-item>
      </q-list>
      <q-inner-loading :showing="pending">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-menu>
  </q-btn>
</template>
