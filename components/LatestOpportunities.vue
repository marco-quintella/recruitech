<script lang="ts" setup>
import type { GetProcessesResponse } from '~/server/api/processes/index.get'

const { data } = await useFetch<GetProcessesResponse>('/api/processes', {
  method: 'GET',
  query: {
    orderBy: 'createdAt',
  },
})
</script>

<template>
  <div flex flex-col gap-4>
    <h2>Últimas Vagas</h2>
    <opening-card
      v-for="process in data?.data"
      :key="process.id"
      :process="process"
    />
  </div>
</template>
