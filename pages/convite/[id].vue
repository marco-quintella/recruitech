<script lang="ts" setup>
const loggedIn = useNuxtApp().$auth.loggedIn

if (loggedIn)
  await navigateTo('/')

const route = useRoute()
const id = (route.params as any).id as string

if (!id)
  await navigateTo('/')

const {
  data: userInvite,
  error: userInviteError,
} = await useFetch(`/api/users/invite`, {
  method: 'get',
  query: {
    id,
  },
})

const {
  data: company,
  error: companyError,
} = await useFetch(`/api/companies`, {
  method: 'get',
  query: {
    id: userInvite.value?.companyId,
  },
})

const name = ref<string>()
const email = ref<string | undefined>(userInvite.value?.email)
const password = ref<string>()
const passwordConfirmation = ref<string>()

const $q = useQuasar()

async function onSubmit() {
  try {
    $q.loading.show()
    await $fetch('/api/auth/invite/accept', {
      body: {
        email: email.value,
        id,
        name: name.value,
        password: password.value,
      },
      method: 'POST',
    })

    $q.notify({
      message: 'Convite aceito com sucesso',
      type: 'positive',
    })

    navigateTo('/auth/login')
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao aceitar convite',
      type: 'negative',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <q-card mx-auto h-fit max-w-100 w-full flex flex-col items-center px-8 pb-8 pt-4>
    <template v-if="!userInviteError && !companyError && userInvite?.invitePending">
      <h2>Aceitar convite para {{ company?.name }}</h2>

      <q-form flex flex-col gap-2 @submit="onSubmit">
        <p text-center>
          Você foi convidado como Recrutador para empresa Apple.
          Complete seus dados de acesso abaixo para aceitar o convite.
        </p>

        <q-separator />

        <q-input
          v-model="name"
          label="Nome"
          outlined
          dense
          :rules="[
            (v?: string) => !!v || 'Obrigatório',
          ]"
        />

        <q-input
          v-model="email"
          label="E-mail"
          outlined
          dense
          readonly
          :rules="[
            (v?: string) => !!v || 'E-mail é obrigatório',
            (v?: string) => !!v && /.+@.+\..+/.test(v) || 'E-mail inválido',
          ]"
        />

        <q-input
          v-model="password"
          label="Senha"
          outlined
          dense
          type="password"
          :rules="[
            (v?: string) => !!v || 'Obrigatório',
            (v: string) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres',
          ]"
        />

        <q-input
          v-model="passwordConfirmation"
          label="Repita sua senha"
          outlined
          dense
          type="password"
          :rules="[
            (v?: string) => !!v || 'Obrigatório',
            (v: string) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres',
            (v: string) => v === password || 'Senhas não conferem',
          ]"
        />

        <q-btn
          color="primary"
          text-color="primary-text"
          label="Salvar"
          type="submit"
        />
      </q-form>
    </template>
    <template v-else>
      <h2>Não foi possível localizar o convite.</h2>
    </template>
  </q-card>
</template>
