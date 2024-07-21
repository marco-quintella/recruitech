<script lang="ts" setup>
import type { GetProcessesResponse } from '~~/server/api/processes/index.get'

const props = defineProps<{ companyId?: string }>()

const search = ref<string>()
const location = ref<GetLocationsResponse[0]>()
const tags = ref<GetTagsResponse[0][]>([])
const contractTypes = ref<typeof contractTypeOptions>([])
const experienceLevels = ref<typeof experienceLevelOptions>([])
const remoteTypes = ref<typeof remoteTypeOptions>([])

const { data, status } = await useFetch<GetProcessesResponse>('/api/processes', {
  method: 'GET',
  query: {
    cancelled: false,
    city: computed(() => location.value?.city),
    companyId: props.companyId,
    contractTypes: computed(() => contractTypes.value.length ? contractTypes.value.map(t => t.value) : undefined),
    country: computed(() => location.value?.country),
    experienceLevels: computed(() => experienceLevels.value.length ? experienceLevels.value.map(t => t.value) : undefined),
    finished: false,
    orderBy: 'createdAt',
    remoteTypes: computed(() => remoteTypes.value.length ? remoteTypes.value.map(t => t.value) : undefined),
    search,
    state: computed(() => location.value?.state),
    tags: computed(() => tags.value.length ? tags.value.map(t => t.id) : undefined),
  },
})
</script>

<template>
  <div w-full flex flex-col gap-4>
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
      <div flex flex-wrap gap-2>
        <filter-location v-model="location" />
        <filter-tag v-model="tags" />
        <filter-contract-type v-model="contractTypes" />
        <filter-experience-level v-model="experienceLevels" />
        <filter-remote-type v-model="remoteTypes" />
      </div>
      <div
        v-if="
          location
            || tags.length
            || contractTypes.length
            || experienceLevels.length
            || remoteTypes.length
        "
        flex flex-wrap
      >
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

        <div v-if="contractTypes.length" flex gap-1>
          <q-chip
            v-for="contractType in contractTypes"
            :key="contractType.value"
            removable
            @remove="contractTypes.splice(contractTypes.indexOf(contractType), 1)"
          >
            {{ contractType.label }}
          </q-chip>
        </div>

        <div v-if="experienceLevels.length" flex gap-1>
          <q-chip
            v-for="experienceLevel in experienceLevels"
            :key="experienceLevel.value"
            removable
            @remove="experienceLevels.splice(experienceLevels.indexOf(experienceLevel), 1)"
          >
            {{ experienceLevel.label }}
          </q-chip>
        </div>

        <div v-if="remoteTypes.length" flex gap-1>
          <q-chip
            v-for="remoteType in remoteTypes"
            :key="remoteType.value"
            removable
            @remove="remoteTypes.splice(remoteTypes.indexOf(remoteType), 1)"
          >
            {{ remoteType.label }}
          </q-chip>
        </div>
      </div>

      <opening-card
        v-for="process in data?.data"
        :key="process.id"
        :process="process"
      />
      <q-inner-loading :showing="status === 'pending'">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>

      <div
        v-if="data?.meta?.pagination?.total === 0
          || !data"
        text="gray-6 center"
      >
        Nenhuma vaga encontrada
      </div>
    </div>
  </div>
</template>
