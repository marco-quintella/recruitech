<script lang="ts" setup>
import type { QTableProps } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()
const { user: currentUser } = storeToRefs(userStore)

const columns: QTableProps['columns'] = [
  {
    align: 'left',
    field: 'name',
    label: 'Nome',
    name: 'name',
    sortable: true,
  },
  {
    align: 'left',
    field: 'email',
    label: 'E-mail',
    name: 'email',
    sortable: true,
  },
  {
    align: 'left',
    field: 'role',
    format: role => role === RoleEnum.company_admin ? 'Administrador' : 'Recrutador',
    label: 'Função',
    name: 'role',
    sortable: true,
  },

]

const pagination = ref({
  descending: false,
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 5,
  sortBy: undefined as string | undefined,
})

const { data: users, execute: onFetch, pending: isLoading } = await useFetch(
  `/api/users/company`,
  {
    method: 'get',
    query: {
      direction: computed(() => pagination.value.descending ? 'desc' : 'asc'),
      id: computed(() => currentUser.value?.companyId),
      orderBy: computed(() => pagination.value.sortBy as string | undefined),
      page: computed(() => pagination.value.page),
      pageSize: computed(() => pagination.value.rowsPerPage),
    },
    server: false,
  },
)

function updatePagination() {
  pagination.value.descending = users.value?.meta?.pagination?.direction === 'desc' ?? 'asc'
  pagination.value.page = users.value?.meta?.pagination?.page ?? pagination.value.page
  pagination.value.rowsNumber = users.value?.meta?.pagination?.total ?? pagination.value.rowsNumber
  pagination.value.rowsPerPage = users.value?.meta?.pagination?.pageSize ?? pagination.value.rowsPerPage
  pagination.value.sortBy = users.value?.meta?.pagination?.orderBy ?? pagination.value.sortBy
}

updatePagination()
watch(users, updatePagination)

async function onRequest(
  props?: Parameters<NonNullable<QTableProps['onRequest']>>[0],
) {
  pagination.value.page = props?.pagination?.page ?? pagination.value.page
  pagination.value.rowsPerPage = props?.pagination?.rowsPerPage ?? pagination.value.rowsPerPage
  pagination.value.descending = props?.pagination?.descending ?? pagination.value.descending
  pagination.value.sortBy = props?.pagination?.sortBy as string | undefined ?? pagination.value.sortBy
}

const rows = computed(() => users.value?.data ?? [])

function editUser(user: User) {
  if (user.id === currentUser.value?.id)
    return

  $q.dialog({
    cancel: true,
    message: 'Defina o tipo de perfil do usuário:',
    options: {
      items: [
        { label: 'Administrador', value: RoleEnum.company_admin },
        { label: 'Recrutador', value: RoleEnum.recruiter },
      ],
      model: user.role,
      type: 'radio',
    },
    persistent: true,
    title: `Editando ${user.name}`,
  }).onOk(async (newRole) => {
    try {
      $q.loading.show()
      await $fetch(`/api/users/${user.id}`, {
        body: { role: newRole },
        method: 'PATCH',
      })
      onFetch()
    }
    catch (error) {
      $q.notify({
        color: 'negative',
        message: 'Erro ao editar usuário',
        position: 'top',
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
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>

            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>

            <q-td key="role" :props="props">
              {{ props.cols[2]?.value }}
            </q-td>

            <q-popup-proxy context-menu>
              <q-card>
                <q-list>
                  <q-item v-close-popup clickable @click="editUser(props.row)">
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
