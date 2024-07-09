<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const { session: user } = useAuth()

if (!user.value?.data?.role || user.value.data.role === RoleEnum.candidate)
  navigateTo('/')

const { onRequest, pagination, updatePagination } = usePagination()

type RowType = typeof candidatesRows.value[0]

const search = ref<string>()

const { data: candidates, status } = useFetch('/api/candidates', {
  method: 'get',
  query: {
    page: computed(() => pagination.value.page ?? 1),
    pageSize: computed(() => pagination.value.rowsPerPage ?? 20),
    search,
  },
})

const candidatesRows = computed(() => candidates.value?.data ?? [])

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: (row: any) => row.user.name,
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
    <div flex="~">
      <q-input
        v-model="search"
        placeholder="Pesquisar"
        dense
        outlined
        clearable
      />
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
        <template #body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.user.name }}
            </q-td>

            <q-td key="location" :props="props">
              <template v-if="props.row.location">
                <location-badges :locations="[props.row.location]" />
              </template>
              <template v-else>
                Não definida
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
