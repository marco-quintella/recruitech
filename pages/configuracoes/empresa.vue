<script setup lang="ts">
const $q = useQuasar()
const { updateSession } = useAuth()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { data } = await useFetch(`/api/companies/${user.value?.companyId}`, {
  method: 'GET',
  watch: [user],
})

const model = ref({
  name: data.value?.name,
})

const hasDiff = computed(() => {
  return model.value.name !== user.value?.name
})

async function onSubmit() {
  if (!model.value.name || !user.value?.id)
    return

  try {
    $q.loading.show()
    await $fetch('/api/user', {
      method: 'PATCH',
      body: {
        id: user.value.id,
        name: model.value.name,
      },
    })

    await updateSession()
  }
  catch (e: any) {
    $q.notify({
      type: 'negative',
      message: e.data?.message || e.message || 'Erro ao salvar',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <div h-fit w-full flex flex-col items-center pt-12>
    <h1>Dados da Empresa</h1>
    <p>[{{ user?.companyId }}]</p>
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form flex flex-col gap-2 @submit="onSubmit">
        <q-input
          v-model="model.name"
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
