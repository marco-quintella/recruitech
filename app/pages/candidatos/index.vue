<script lang="ts" setup>
import type { tags as Tags, locations } from '@prisma/client'
import type { QTableProps } from 'quasar'
import { RoleEnum } from '~~/server/utils/enums'

const { session: user } = useAuth()

if (!user.value?.data?.role || user.value.data.role === RoleEnum.candidate)
  navigateTo('/')

const { onRequest, pagination, updatePagination } = usePagination()

type RowType = typeof candidatesRows.value[0]

const search = ref<string>()
const location = ref<locations>()
const tags = ref<Tags[]>([])
const experienceLevels = ref<typeof experienceLevelOptions>([])
const favorite = ref<boolean>(false)
const discard = ref<boolean>(false)

const { data: candidates, status } = useFetch('/api/candidates', {
  method: 'get',
  query: {
    discard,
    favorite,
    location: computed(() => location.value?.id),
    orderBy: 'createdAt',
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

function onFavorite() {
  if (favorite.value) {
    favorite.value = false
    return
  }
  discard.value = false
  favorite.value = true
}

function onDiscard() {
  if (discard.value) {
    discard.value = false
    return
  }
  favorite.value = false
  discard.value = true
}
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
        <q-btn dense color="primary" :outline="!favorite" @click="onFavorite">
          Favorito
        </q-btn>
        <q-btn dense color="primary" :outline="!discard" @click="onDiscard">
          Descarte
        </q-btn>
      </div>
    </div>

    <div
      v-if="
        location
          || tags?.length
          || experienceLevels.length
          || favorite || discard
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

      <div v-if="favorite" flex gap-1>
        <q-chip
          removable
          @remove="favorite = false"
        >
          Favorito
        </q-chip>
      </div>

      <div v-if="discard" flex gap-1>
        <q-chip
          removable
          @remove="discard = false"
        >
          Descarte
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
            <div flex items-center gap-1>
              <nuxt-link :to="`/candidatos/${props.row.id}`">
                {{ props.row.user.name }}
              </nuxt-link>

              <div v-if="props.row.candidateFavorites?.length" i-ph-star-fill color-yellow />
              <div v-if="props.row.candidateDiscards?.length" i-ph-trash-fill color-red />
            </div>
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
