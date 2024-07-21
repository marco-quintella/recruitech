<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()
const { user: currentUser } = storeToRefs(userStore)

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: 'title',
    label: 'Título',
    name: 'title',
  },
  {
    align: 'left',
    field: 'createdAt',
    label: 'Data de Criação',
    name: 'createdAt',
  },
  {
    align: 'center',
    field: 'finishedAt',
    label: 'Data de Finalização',
    name: 'finishedAt',
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

// Processes Sideffect
watch(processes, () => updatePagination(processes), { immediate: true })
const rows = computed(() => processes.value?.data ?? [])

async function onEdit(id: string) {
  navigateTo(`/minha-empresa/processos/editar/${id}`)
}

function onCancel(id: string) {
  $q.dialog({
    cancel: {
      color: 'primary',
      label: 'Não',
    },
    message: 'Deseja realmente cancelar este processo?',
    ok: {
      color: 'negative',
      label: 'Sim',
    },
    title: 'Cancelar Processo',
  }).onOk(async () => {
    try {
      $q.loading.show()
      await $fetch(`/api/processes/${id}/cancel`, { method: 'post' })
    }
    catch (e: any) {
      $q.notify({
        message: e.data?.message || e.message || 'Erro ao cancelar processo',
        type: 'negative',
      })
    }
    finally {
      $q.loading.hide()
    }
  })
}

function onFinish(id: string) {
  $q.dialog({
    cancel: {
      color: 'primary',
      label: 'Não',
    },
    message: 'Deseja realmente finalizar este processo?',
    ok: {
      color: 'negative',
      label: 'Sim',
    },
    title: 'Finalizar Processo',
  }).onOk(async () => {
    try {
      $q.loading.show()
      await $fetch(`/api/processes/${id}/finish`, { method: 'post' })
    }
    catch (e: any) {
      $q.notify({
        message: e.data?.message || e.message || 'Erro ao finalizar processo',
        type: 'negative',
      })
    }
    finally {
      $q.loading.hide()
    }
  })
}
</script>

<template>
  <div w-full>
    <div mx-auto max-w-4xl w-full flex flex-col gap-4>
      <div flex items-center justify-between gap-4>
        <h2>
          Processos
        </h2>
        <div>
          <q-btn
            color="primary"
            @click="navigateTo('/vagas/postar')"
          >
            Incluir
          </q-btn>
        </div>
      </div>
      <q-table
        v-model:pagination="pagination"
        :columns="columns"
        :loading="isLoading"
        :rows="rows"
        binary-state-sort
        row-key="id"
        w-full
        @request="onRequest"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>

            <q-td key="createdAt" :props="props">
              {{ $dayjs(props.row.createdAt).toDate().toLocaleDateString() }}
            </q-td>

            <q-td key="finishedAt" :props="props">
              {{
                props.row.finishedAt
                  ? $dayjs(props.row.finishedAt).toDate().toLocaleDateString()
                  : props.row.cancelledAt
                    ? $dayjs(props.row.cancelledAt).toDate().toLocaleDateString()
                    : 'Não finalizado'
              }}
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

                  <q-item v-close-popup clickable @click="onFinish(props.row.id)">
                    <q-item-section avatar>
                      <div i-ph-check />
                    </q-item-section>
                    <q-item-section>Finalizar</q-item-section>
                  </q-item>

                  <q-item v-close-popup clickable @click="onCancel(props.row.id)">
                    <q-item-section avatar>
                      <div i-ph-trash />
                    </q-item-section>
                    <q-item-section>Cancelar</q-item-section>
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
