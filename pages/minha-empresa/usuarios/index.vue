<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: 'name',
    label: 'Nome',
    name: 'nome',
  },
  {
    align: 'left',
    field: 'email',
    label: 'E-mail',
    name: 'email',
  },
  {
    align: 'left',
    field: 'role',
    format: role => role === RoleEnum.company_admin ? 'Administrador' : 'Recrutador',
    label: 'Função',
    name: 'role',
  },

]

const pagination = reactive({
  descending: false,
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 10,
  sortBy: undefined as string | undefined,
})

const { data: users, pending: isLoading } = await useFetch<{
  data: User[]
  meta: { pagination: { total: number } }
}>(
  `/api/users/company/${user.value?.companyId}`,
  {
    method: 'GET',
    params: {
      orderBy: {
        direction: pagination.descending ? 'desc' : 'asc',
        field: pagination.sortBy as string | undefined,
      },
      page: pagination.page,
      pageSize: pagination.rowsPerPage,
    },
    watch: [pagination],
  },
)

async function onRequest(
  props?: Parameters<NonNullable<QTableProps['onRequest']>>[0],
) {
  pagination.page = props?.pagination?.page ?? pagination.page
  pagination.rowsPerPage = props?.pagination?.rowsPerPage ?? pagination.rowsPerPage
  pagination.descending = props?.pagination?.descending ?? pagination.descending
  pagination.sortBy = props?.pagination?.sortBy as string | undefined ?? pagination.sortBy
}

const rows = computed(() => users.value?.data ?? [])
</script>

<template>
  <div w-full>
    <div mx-auto max-w-4xl w-full>
      <div flex items-center justify-between gap-4>
        <h2>
          Usuários
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
      />
    </div>
  </div>
</template>
