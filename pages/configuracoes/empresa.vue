<script setup lang="ts">
const $q = useQuasar()
const { updateSession } = useAuth()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { data: company, refresh } = await useFetch(`/api/companies/details`, {
  method: 'GET',
  query: {
    id: user.value?.companyId,
  },
})

const model = ref<CompanyUpdate & {
  location?: { city?: string, state?: string, country?: string }
}>({
  companySize: company.value?.companySize,
  facebook: company.value?.facebook,
  id: company.value?.id,
  instagram: company.value?.instagram,
  linkedin: company.value?.linkedin,
  location: {
    city: company.value?.locations?.city ?? undefined,
    country: company.value?.locations?.country,
    state: company.value?.locations?.state ?? undefined,
  },
  name: company.value?.name,
  shortDescription: company.value?.shortDescription,
  twitter: company.value?.twitter,
  website: company.value?.website,
})

const newLogo = ref<File>()

async function onSubmit() {
  if (!model.value.name || !company.value?.id)
    return

  try {
    $q.loading.show()
    await $fetch('/api/companies', {
      body: model.value,
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
  <div h-fit w-full flex flex-col items-center gap-4>
    <h1>Dados da Empresa</h1>
    <q-card
      b="1 primary solid rd-3"
      flat max-w-xl w-full flex flex-col gap-2 p-8
    >
      <div
        v-if="company?.logo"
        class="w-full flex gap-4"
      >
        <company-avatar
          :src="company.logo"
          :name="company.name"
          size="98px"
        />

        <div flex="~ 1 col" justify-center gap-1>
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
      </div>

      <q-separator my-2 />

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

        <q-input
          v-model="model.shortDescription"
          label="Descrição Curta"
          outlined
          dense
          :rules="[
            (v?: string) => !v ? true : v.length <= 120 || 'Máximo de 120 caracteres',
          ]"
        />

        <div pb-4>
          <select-company-size
            v-model="model.companySize"
          />
        </div>

        <div>Localização da Matriz</div>
        <select-location
          v-model="model.location"
        />

        <q-separator my-2 />

        <q-input
          v-model="model.website"
          label="Link Website"
          outlined
          dense
          :rules="[urlRuleNullish]"
        />

        <q-input
          v-model="model.facebook"
          label="Link Facebook"
          outlined
          dense
          :rules="[urlRuleNullish]"
        />

        <q-input
          v-model="model.twitter"
          label="Link Twitter"
          outlined
          dense
          :rules="[urlRuleNullish]"
        />

        <q-input
          v-model="model.instagram"
          label="Link Instagram"
          outlined
          dense
          :rules="[urlRuleNullish]"
        />

        <q-input
          v-model="model.linkedin"
          label="Link LinkedIn"
          outlined
          dense
          :rules="[urlRuleNullish]"
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
