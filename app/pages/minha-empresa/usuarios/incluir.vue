<script lang="ts" setup>
import type { RoleEnum } from '~~/server/utils/enums'

const $q = useQuasar()

const email = ref<string>()
const role = ref<RoleEnum>()

async function onSubmit() {
  try {
    $q.loading.show()
    await $fetch('/api/users/company/invite', {
      body: {
        email: email.value,
        role: role.value,
      },
      method: 'POST',
    })

    navigateTo('/minha-empresa/usuarios')
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao convidar',
      type: 'negative',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <div h-fit w-full flex flex-col items-center gap-4 pt-12>
    <h2>Incluir Usuário</h2>
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form flex flex-col gap-2 @submit="onSubmit">
        <p>Convide um novo usuário recrutador para sua empresa através do e-mail do usuário.</p>

        <q-separator />

        <q-input
          v-model="email"
          label="E-mail"
          outlined
          dense
          :rules="[
            (v?: string) => !!v || 'E-mail é obrigatório',
            (v?: string) => !!v && /.+@.+\..+/.test(v) || 'E-mail inválido',
          ]"
        />

        <q-btn
          color="primary"
          text-color="primary-text"
          label="Salvar"
          type="submit"
        />
      </q-form>
    </q-card>
  </div>
</template>
