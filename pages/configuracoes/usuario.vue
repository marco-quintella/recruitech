<script setup lang="ts">
const $q = useQuasar()
const { updateSession } = useAuth()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const model = ref({
  nome: user.value?.name ?? '',
})

const hasDiff = computed(() => {
  return model.value.nome !== user.value?.name
})

async function onSubmit() {
  if (!model.value.nome || !user.value?.id)
    return

  try {
    $q.loading.show()
    await $fetch('/api/users', {
      body: {
        id: user.value.id,
        name: model.value.nome,
      },
      method: 'PATCH',
    })

    await updateSession()

    $q.notify({
      message: 'Salvo com sucesso',
      type: 'positive',
    })
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao salvar',
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
    <h1>Configurações de Usuário</h1>
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form flex flex-col gap-2 @submit="onSubmit">
        <q-input
          v-model="model.nome"
          label="Nome"
          outlined
          dense
          :rules="[
            (v?: string) => !!v || 'Nome é obrigatório',
          ]"
        />

        <q-btn
          v-if="hasDiff"
          color="primary"
          text-color="primary-text"
          label="Salvar"
          type="submit"
        />
      </q-form>
    </q-card>
  </div>
</template>

<style lang="sass">

</style>
