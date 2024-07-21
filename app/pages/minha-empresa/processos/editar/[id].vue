<script setup lang="ts">
import type { experienceLevel, remoteType } from '@prisma/client'
import { processType } from '@prisma/client'

const route = useRoute()
const $q = useQuasar()

const { data: process } = await useFetch(`/api/processes`, {
  method: 'GET',
  query: {
    id: route.params.id,
  },
})

const model = ref<{
  cancelledAt?: Date | null
  createdAt?: Date | null
  finishedAt?: Date | null
  updatedAt?: Date | null
  tags?: string[]
  jobTitles?: string[]
  location?: { city?: string, state?: string, country?: string }
  processType?: processType
  email?: string | null
  link?: string | null
  title?: string
  description?: string
  experienceLevel?: experienceLevel | null
  remote?: remoteType
  salary0?: string | null
  salary1?: string | null
}>({})

watch(process, (newProcess) => {
  if (newProcess?.data?.[0]) {
    model.value = {
      ...newProcess.data[0],
      cancelledAt: newProcess.data[0].cancelledAt ? new Date(newProcess.data[0].cancelledAt) : null,
      createdAt: new Date(newProcess.data[0].createdAt),
      finishedAt: newProcess.data[0].finishedAt ? new Date(newProcess.data[0].finishedAt) : null,
      jobTitles: newProcess?.data?.[0]?.jobTitles?.map(jobTitle => jobTitle.id),
      tags: newProcess?.data?.[0]?.tags?.map(tag => tag.id),
      updatedAt: new Date(newProcess.data[0].updatedAt),
    }
  }
}, { immediate: true })

async function onSave() {
  try {
    $q.loading.show()

    await $fetch('/api/processes', {
      body: cleanData(model.value),
      method: 'PATCH',
    })

    await navigateTo('/minha-empresa/processos')
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao editar processo',
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
    <h1>Editar Processo</h1>
    <q-card
      b="1 primary solid rd-3"
      flat max-w-2xl w-full flex flex-col gap-2 p-8
    >
      <q-form
        class="flex flex-col gap-2"
        @submit="onSave"
      >
        <div flex items-start gap-2>
          <div flex-1>
            <SelectProcessType
              v-model="model.processType"
              :rules="[(val?: string) => !!val || 'Campo obrigatório']"
            />
          </div>
          <q-btn
            class="mt-2.5"
            size="xs"
            color="primary"
            dense rounded
            icon="question_mark"
            @click="$q.dialog({
              html: true,
              message: `<b>Tipos de processo:</b><br>
              <ul>
                <li>- GetJobs.Tech: Realize o processo e gerencie os candidatos através da plataforma.</li>
                <li>- Email: Receba os currículos diretamente por e-mail. Candidatos podem enviar o currículos através da plataforma ou através do próprio e-mail.</li>
                <li>- Link: Utilize sua própria plataforma direcionando os candidatos para o seu link.</li>
              </ul>`,
            })"
          />
        </div>

        <q-input
          v-if="model.processType === processType.email"
          v-model="model.email"
          type="email"
          label="Email"
          outlined
          dense
          bottom-slots
          :rules="[(val?: string) => !!val || 'Campo obrigatório']"
        >
          <template #hint>
            Currículos serão enviados para este e-mail.
          </template>
        </q-input>

        <q-input
          v-if="model.processType === processType.link"
          v-model="model.link"
          type="url"
          label="Link"
          outlined
          dense
          :rules="[(val?: string) => !!val || 'Campo obrigatório']"
          bottom-slots
        >
          <template #hint>
            Candidatos serão direcionados para esse link.
          </template>
        </q-input>

        <q-input
          v-model="model.title"
          label="Título"
          outlined
          dense
          :rules="[(val?: string) => !!val || 'Campo obrigatório']"
        />

        <q-input
          v-model="model.description"
          label="Descrição"
          outlined
          dense
          type="textarea"
          :rules="[(val?: string) => !!val || 'Campo obrigatório']"
        />

        <SelectJobTitles
          v-model="model.jobTitles"
        />
        <p class="mb-4 text-xs text-primary">
          Utilize os títulos de função para encontrar candidatos com
          experiência e compatibilidade direta com a função desejada.
        </p>

        <SelectExperienceLevel
          v-model="model.experienceLevel"
          clearable
          class="mb-4"
        />

        <SelectTags
          v-model="model.tags"
        />
        <p class="mb-4 text-xs text-primary">
          Selecione somente as principais Tags compatíveis com a vaga para
          obter melhores resultados. Tags são utilizadas para refinar as
          sugestões de candidatos.
        </p>

        <RemoteRadio v-model="model.remote" class="mb-2" />

        <SelectLocation v-model="model.location" />

        <div flex gap-4>
          <q-input
            v-model="model.salary0"
            label="Salário mínimo"
            outlined
            dense
            type="number"
            clearable
            :min="0"
            :rules="[(s: number) => (isDefined(s) ? s > 0 : true) ?? 'Valor mínimo deve ser maior que zero.']"
          />

          <q-input
            v-model="model.salary1"
            label="Salário máximo"
            outlined
            dense
            type="number"
            clearable
            :min="model.salary0"
            :rules="[
              (s: number) => (isDefined(s) ? Number(s) > 0 : true) ?? 'Valor mínimo deve ser maior que zero.',
              (s: number) => (isDefined(s) && isDefined(model.salary0)
                ? Number(s) > Number(model.salary0)
                : true
              ) ?? 'Valor máximo deve ser maior que o valor mínimo.',
            ]"
          />
        </div>

        <q-btn color="primary" label="Postar" type="submit" />
      </q-form>
    </q-card>
  </div>
</template>

<style lang="scss">

</style>
