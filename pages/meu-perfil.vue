<script lang="ts" setup>
const $q = useQuasar()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { session } = useAuth()

if (session?.value?.data?.role !== RoleEnum.candidate)
  navigateTo('/')

const { data: profile } = await useFetch('/api/profiles/me', {
  method: 'get',
})

const userModel = ref({
  name: user.value?.name,
})

const profileModel = ref({
  presentation: profile.value?.presentation || '',
  tags: profile.value?.tags?.filter(Boolean).map(t => t.id as string) || [],
})

async function onSubmit() {
  if (!profileModel.value.presentation?.length && !profileModel.value.tags?.length) {
    return $q.notify({
      message: 'Preencha ao menos um dos campos',
      type: 'negative',
    })
  }

  try {
    $q.loading.show()
    if (!profile.value) {
      await $fetch('/api/profiles/me', {
        body: profileModel.value,
        method: 'post',
      })
    }
    else {
      await $fetch('/api/profiles/me', {
        body: profileModel.value,
        method: 'patch',
      })
    }
    await $fetch('/api/users/me', {
      body: userModel.value,
      method: 'patch',
    })
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
  <q-page
    padding
    flex flex-col
    items-center gap-4 pt-12
  >
    <h2>Meu Perfil</h2>
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form flex flex-col @submit="onSubmit">
        <q-input
          v-model="userModel.name"
          dense
          outlined
          label="Nome"
          :rules="[
            (v?: string) => !!v || 'Obrigatório',
          ]"
        />

        <q-input
          v-model="profileModel.presentation"
          dense
          outlined
          label="Apresentação"
          type="textarea"
          class="mb-5"
        />

        <select-tags
          v-model="profileModel.tags"
          label="Habilidades"
        />

        <q-btn
          color="primary"
          text-color="primary-text"
          label="Salvar"
          type="submit"
          class="mt-8"
        />
      </q-form>
    </q-card>
  </q-page>
</template>
