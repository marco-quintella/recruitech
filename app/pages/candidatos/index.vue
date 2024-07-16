<script lang="ts" setup>
import { role } from '@prisma/client'
import type { QTableProps } from 'quasar'
import type { GetLocationsResponse } from '~/server/services/locations/getLocations'
import type { GetTagsResponse } from '~/server/services/tags/get-tags'

const { session: user } = useAuth()

if (!user.value?.data?.role || user.value.data.role === role.candidate)
  navigateTo('/')

const { onRequest, pagination, updatePagination } = usePagination()

type RowType = typeof candidatesRows.value[0]

const search = ref<string>()
const location = ref<GetLocationsResponse[0]>()
const tags = ref<GetTagsResponse[0][]>([])
const experienceLevels = ref<typeof experienceLevelOptions>([])

const { data: candidates, status } = useFetch('/api/candidates', {
  method: 'get',
  query: {
    location: computed(() => location.value?.id),
    orderBy: '-createdAt',
    page: computed(() => pagination.value.page ?? 1),
    pageSize: computed(() => pagination.value.rowsPerPage ?? 20),
    search,
    tags: computed(() => tags.value?.map(t => t.id)),
  },
})

const candidatesRows = computed(() => candidates.value?.data ?? [])

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: (row: RowType) => row.user.name,
    label: 'Nome',
    name: 'name',
    sortable: true,
  },
  {
    align: 'left',
    field: (row: RowType) => row.location,
    label: 'Localização',
    name: 'location',
    sortable: true,
  },
  {
    align: 'left',
    field: (row: RowType) => row.jobTitles?.length ? row.jobTitles.map(j => j.name).join(', ') : '-',
    label: 'Funções',
    name: 'jobTitles',
    sortable: true,
  },
  {
    align: 'left',
    field: (row: RowType) => row.tags?.length ? row.tags.map(t => t.name).join(', ') : '-',
    label: 'Tags',
    name: 'tags',
    sortable: true,
  },
]

watch(candidates, () => updatePagination(candidates), { immediate: true })
</script>

<template>
  <q-page
    padding
    flex="~ col items-center gap-4"
    pt-12
  >
    <h2>Candidatos</h2>
    <div
      flex="~ col gap-2"
      max-w-4xl
      w-full
    >
      <q-input
        v-model="search"
        class="w-full"
        placeholder="Pesquisar"
        dense
        outlined
        clearable
        :debounce="350"
      />
      <div flex flex-wrap gap-2>
        <filter-location v-model="location" />
        <filter-tag v-model="tags" />
        <filter-experience-level v-model="experienceLevels" />
      </div>
    </div>

    <div
      v-if="
        location
          || tags?.length
          || experienceLevels.length
      "
      max-w-4xl w-full flex flex-wrap
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

      <div v-if="tags?.length" flex gap-1>
        <q-chip
          v-for="tag in tags"
          :key="tag.id"
          removable
          @remove="tags?.splice(tags.indexOf(tag), 1)"
        >
          {{ tag.name }}
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
    </div>

    <q-card
      flat
      max-w-4xl
      w-full
      b="1 primary solid rd-3"
    >
      <q-table
        v-model:pagination="pagination"
        :columns="columns"
        :rows="candidatesRows"
        :loading="status === 'pending'"
        row-key="id"
        binary-state-sort
        w-full
        @request="onRequest"
      >
        <template #body-cell-name="props">
          <td class="text-left">
            <nuxt-link :to="`/candidatos/${props.row.id}`">
              {{ props.row.user.name }}
            </nuxt-link>
          </td>
        </template>

        <template #body-cell-location="props">
          <td class="text-left">
            <template v-if="props.row.location">
              <location-badges :locations="[props.row.location]" />
            </template>
            <template v-else>
              Não definida
            </template>
          </td>
        </template>

        <template #body-cell-tags="props">
          <td class="flex flex-wrap gap-2 text-left">
            <template v-if="props.row.tags?.length">
              <div
                v-for="tag of props.row.tags"
                :key="tag.id"
                flex
                items-center
                gap-1
              >
                <div i-ph-tag />
                <div flex-1 truncate>
                  {{ tag.name }}
                </div>
              </div>
            </template>
            <template v-else>
              Não definidas
            </template>
          </td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
