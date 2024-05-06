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

const { onRequest, pagination, updatePagination } = usePagination()

const { data: users, execute: onFetch, pending: isLoading } = await useFetch(
  `/api/users/company`,
  {
    method: 'get',
    query: {
      companyId: computed(() => currentUser.value?.companyId),
      direction: computed(() => pagination?.value.descending ? 'desc' : 'asc'),
      orderBy: computed(() => pagination?.value.sortBy as string | undefined),
      page: computed(() => pagination?.value.page),
      pageSize: computed(() => pagination?.value.rowsPerPage),
    },
    server: false,
  },
)

watch(users, () => updatePagination(users), { immediate: true })

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
  }).onOk(async (newRole: Role) => {
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
    <div mx-auto max-w-4xl w-full flex flex-col gap-4>
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

            <q-popup-proxy v-if="props.row.id !== currentUser?.id" context-menu>
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
