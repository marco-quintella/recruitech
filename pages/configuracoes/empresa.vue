<script setup lang="ts">
const $q = useQuasar()
const { updateSession } = useAuth()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { data: company, refresh } = await useFetch(`/api/companies`, {
  method: 'GET',
  query: {
    id: user.value?.companyId,
  },
})

const model = ref<CompanyUpdate>({
  name: company.value?.name,
})

const newLogo = ref<File>()

const hasDiff = computed(() => {
  return model.value.name !== company.value?.name
})

async function onSubmit() {
  if (!model.value.name || !company.value?.id)
    return

  try {
    $q.loading.show()
    await $fetch('/api/companies', {
      body: {
        id: company.value.id,
        name: model.value.name,
      },
      method: 'patch',
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

async function uploadCompanyLogo() {
  if (!newLogo.value)
    return

  $q.loading.show()

  try {
    const reader = new FileReader()
    reader.readAsDataURL(newLogo.value)
    reader.onload = async () => {
      const data = reader.result

      await $fetch(`/api/companies/logo`, {
        body: {
          fileBase64: data,
          id: user.value?.companyId,
        },
        method: 'POST',
      })

      newLogo.value = undefined

      await refresh()
    }
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
    <h1>Dados da Empresa</h1>
    <q-card
      b="1 primary solid rd-3"
      flat max-w-100 w-full flex flex-col gap-2 p-8
    >
      <div v-if="company?.logo" class="flex justify-center">
        <q-img :src="company.logo" class="w-50%" />
      </div>
      <div class="flex flex-col gap-1">
        <q-file
          v-model="newLogo"
          :label="company?.logo ? 'Mudar Logo' : 'Enviar Logo'"
          accept="image/*"
          dense
          max-file-size="2097152"
          outlined
        />
        <p text-3 text-primary>
          Utilize uma imagem tamanho máximo de 2MB
        </p>
        <q-btn
          v-if="newLogo"
          color="primary"
          text-color="primary-text"
          label="Salvar Logo"
          dense
          @click="uploadCompanyLogo"
        />
      </div>
      <q-separator />
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
