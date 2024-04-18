<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const users = ref<Partial<User>[]>([])

const columns: QTableProps['columns'] = [
  {
    name: 'nome',
    field: 'name',
    label: 'Nome',
    align: 'left',
  },
  {
    name: 'email',
    field: 'email',
    label: 'E-mail',
    align: 'left',
  },
  {
    name: 'role',
    field: 'role',
    label: 'Função',
    format: role => role === RoleEnum.company_admin ? 'Administrador' : 'Recrutador',
    align: 'left',
  },

]

const isLoading = ref(false)

const pagination = ref({
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 10,
  sortBy: undefined as string | undefined,
  descending: false,
})

async function onRequest(
  props?: Parameters<NonNullable<QTableProps['onRequest']>>[0],
) {
  try {
    isLoading.value = true
    const page = props?.pagination?.page ?? pagination.value.page
    const pageSize = props?.pagination?.rowsPerPage ?? pagination.value.rowsPerPage
    const orderBy = {
      direction: props?.pagination?.descending ? 'desc' : 'asc',
      field: props?.pagination?.sortBy as string | undefined,
    }

    const result = await $fetch(`/api/users/company/${user.value?.companyId}`, {
      method: 'GET',
      params: {
        page,
        pageSize,
        orderBy,
      },
    })

    if (result) {
      pagination.value = {
        page,
        rowsPerPage: pageSize,
        rowsNumber: result.meta.pagination.total,
        sortBy: orderBy.field,
        descending: orderBy.direction === 'desc',
      }
      users.value = result?.data ?? []
    }
  }
  catch (e: any) {
    $q.notify({
      type: 'negative',
      message: e.data?.message || e.message || 'Erro ao carregar',
    })
  }
  finally {
    isLoading.value = false
  }
}

onRequest()
</script>

<template>
  <div w-full>
    <div mx-auto max-w-4xl w-full>
      <h2>
        Usuários
      </h2>
      <q-table
        v-model:pagination="pagination"
        :columns="columns"
        :rows="users"
        :loading="isLoading"
        row-key="id"
        binary-state-sort
        w-full
        @request="onRequest"
      />
    </div>
  </div>
</template>
