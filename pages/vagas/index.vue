<script lang="ts" setup>
import type { Location } from '~/db/locations'
import type { GetProcessesResponse } from '~/server/api/processes/index.get'

const search = ref<string>()
const location = ref<Location>()

const { data, pending } = await useFetch<GetProcessesResponse>('/api/processes', {
  method: 'GET',
  query: {
    locationId: computed(() => location.value?.id),
    orderBy: 'createdAt',
    search,
  },
})
</script>

<template>
  <div flex justify-center>
    <div max-w-2xl w-full flex flex-col gap-4>
      <h2>Vagas ({{ data?.meta?.pagination?.total }})</h2>
      <div flex="~ col gap-2">
        <div>
          <q-input
            v-model="search"
            placeholder="Buscar vagas"
            dense
            outlined
            clearable
            debounce="750"
          />
        </div>
        <div flex>
          <filter-location v-model="location" />
        </div>
      </div>

      <opening-card
        v-for="process in data?.data"
        :key="process.id"
        :process="process"
      />
      <q-inner-loading :showing="pending">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </div>
</template>
