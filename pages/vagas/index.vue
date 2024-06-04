<script lang="ts" setup>
import type { GetProcessesResponse } from '~/server/api/processes/index.get'

const search = ref<string>()
const location = ref<GetLocationsResponse[0]>()
const tags = ref<GetTagsResponse[0][]>([])

const { data, pending } = await useFetch<GetProcessesResponse>('/api/processes', {
  method: 'GET',
  query: {
    locationId: computed(() => location.value?.id),
    orderBy: 'createdAt',
    search,
    tags: computed(() => tags.value.length ? tags.value.map(t => t.id) : undefined),
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
        <div flex gap-2>
          <filter-location v-model="location" />
          <filter-tag v-model="tags" />
        </div>
        <div v-if="location || tags.length" flex flex-wrap>
          <q-chip
            v-if="location"
            removable
            @remove="location = undefined"
          >
            <q-img
              v-if="location.country"
              :src="`https://flagsapi.com/${location.country}/flat/16.png`"
              size="16px"
            />&nbsp;
            {{ [location.city, location.state, location.country].filter(Boolean).join(', ') }}
          </q-chip>

          <div v-if="tags.length" flex gap-1>
            <q-chip
              v-for="tag in tags"
              :key="tag.id"
              removable
              @remove="tags.splice(tags.indexOf(tag), 1)"
            >
              {{ tag.name }}
            </q-chip>
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
  </div>
</template>
