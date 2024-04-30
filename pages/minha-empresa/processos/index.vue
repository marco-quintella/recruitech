<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const userStore = useUserStore()
const { user: currentUser } = storeToRefs(userStore)

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: 'title',
    label: 'Título',
    name: 'title',
    sortable: true,
  },
]

const { onRequest, pagination, updatePagination } = usePagination()

const { data: processes, pending: isLoading } = await useFetch('/api/processes', {
  method: 'GET',
  query: {
    companyId: computed(() => currentUser.value?.companyId),
    direction: computed(() => pagination?.value.descending ? 'desc' : 'asc'),
    orderBy: computed(() => pagination?.value.sortBy as string | undefined),
    page: computed(() => pagination?.value.page),
    pageSize: computed(() => pagination?.value.rowsPerPage),
  },
})

watch(processes, () => updatePagination(processes), { immediate: true })

const rows = computed(() => processes.value?.data ?? [])

async function onEdit(id: string) {
  await navigateTo(`/minha-empresa/processos/editar/${id}`)
}
</script>

<template>
  <div w-full>
    <div mx-auto max-w-4xl w-full>
      <div flex items-center justify-between gap-4>
        <h2>
          Processos
        </h2>
        <div>
          <q-btn
            color="primary"
            @click="navigateTo('/minha-empresa/usuarios/incluir')"
          >
            Incluir
          </q-btn>
        </div>
      </div>
      <q-table
        v-model:pagination="pagination"
        :columns="columns"
        :rows="rows"
        :loading="isLoading"
        row-key="id"
        binary-state-sort
        w-full
        @request="onRequest"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>

            <q-popup-proxy context-menu>
              <q-card>
                <q-list>
                  <q-item v-close-popup clickable @click="onEdit(props.row.id)">
                    <q-item-section avatar>
                      <div i-ph-pencil />
                    </q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section avatar>
                      <div i-ph-trash />
                    </q-item-section>
                    <q-item-section>Excluir</q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-popup-proxy>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
