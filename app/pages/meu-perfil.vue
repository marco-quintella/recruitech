<script lang="ts" setup>
import { RoleEnum } from '~~/server/utils/enums'

const $q = useQuasar()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { session } = useAuth()

if (session?.value?.data?.role !== RoleEnum.candidate)
  navigateTo('/')

const { data: profile, refresh } = await useFetch('/api/profiles/me', {
  method: 'get',
})

const userModel = ref({
  name: user.value?.name,
})

const file = ref<File>()

const profileModel = ref({
  cv: profile.value?.cv,
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
      await refresh()
    }
    else {
      await $fetch('/api/profiles/me', {
        body: profileModel.value,
        method: 'patch',
      })
    }

    if (file.value) {
      const reader = new FileReader()
      reader.readAsDataURL(file.value)
      reader.onload = async () => {
        try {
          $q.loading.show()
          const data = reader.result

          await $fetch(`/api/profiles/cv`, {
            body: {
              fileBase64: data,
              id: profile.value?.id,
            },
            method: 'POST',
          })

          file.value = undefined

          await refresh()
        }
        catch (e: any) {
          $q.notify({
            message: e.data?.message || e.message || 'Erro ao enviar CV',
            type: 'negative',
          })
        }
        finally {
          $q.loading.hide()
        }
      }
    }
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao atualizar',
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
          class="mb-5"
        />

        <div v-if="profileModel.cv" mb-5>
          <nuxt-link :href="profileModel.cv" target="_blank" flex items-center gap-1 text-5 hover:underline>
            <div class="i-ph-file-pdf" />
            Seu CV Atual
          </nuxt-link>
        </div>

        <q-file
          v-model="file"
          :label="profileModel.cv ? 'Mudar CV' : 'Enviar CV'"
          accept="application/pdf"
          dense
          max-file-size="2097152"
          outlined
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
