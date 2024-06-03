<script lang="ts" setup>
import type { GetProcessesResponse } from '~/server/api/processes/index.get'

const search = ref<string>()

const { data } = await useFetch<GetProcessesResponse>('/api/processes', {
  cache: 'force-cache',
  method: 'GET',
  query: {
    orderBy: 'createdAt',
    search,
  },
})
</script>

<template>
  <div flex justify-center>
    <div max-w-2xl w-full flex flex-col gap-4>
      <h2>Vagas</h2>
      <div flex="~ col">
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
      </div>
      <opening-card
        v-for="process in data?.data"
        :key="process.id"
        :process="process"
      />
    </div>
  </div>
</template>
