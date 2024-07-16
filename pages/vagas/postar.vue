<script lang="ts" setup>
import { contractType, type experienceLevel, processType, remoteType, role } from '@prisma/client'
import SelectJobTitles from '~/components/SelectJobTitles.vue'
import SelectExperienceLevel from '~/components/SelectExperienceLevel.vue'
import SelectProcessType from '~/components/SelectProcessType.vue'

const $q = useQuasar()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const model = ref({
  companyId: '',
  contractType: contractType.full_time as contractType,
  description: '',
  email: '',
  experienceLevel: undefined as experienceLevel | undefined,
  jobTitles: [] as string[],
  link: '',
  location: {} as { city: string, state: string },
  processType: processType.platform as processType,
  remote: remoteType.on_site as remoteType,
  salary0: undefined as number | undefined,
  salary1: undefined as number | undefined,
  tags: [] as string[],
  title: '',
  userId: '',
})

// Route protection
watch(user, () => {
  if (!user.value)
    return navigateTo('/login')

  if (
    !user.value?.companyId
    || ![role.company_admin, role.recruiter].includes(user.value?.role)
  ) {
    return navigateTo('/')
  }
}, { immediate: true })

async function onSave() {
  try {
    $q.loading.show()
    await $fetch('/api/processes', {
      body: {
        ...model.value,
        companyId: user.value?.companyId,
        userId: user.value?.id,
      },
      method: 'POST',
    })

    navigateTo('/minha-empresa/processos')
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
  <q-page padding flex flex-col items-center gap-4 pt-12>
    <h1>Nova Vaga</h1>
    <q-card
      b="1 primary solid rd-3"
      max-w="100 md:200"
      flex="~ col"
      flat w-full gap-2 p-8
    >
      <q-form class="flex flex-col gap-2" @submit="onSave">
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
                <li>- Email: Receba os currículos diretamente por e-mail. Candidatos podem enviar o currículos
                  através da plataforma ou através do próprio e-mail.</li>
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

        <div mt-2 w-full flex gap-4>
          <q-input
            v-model="model.salary0"
            :min="0"
            :rules="[(s: number) => (isDefined(s) ? s > 0 : true) ?? 'Valor mínimo deve ser maior que zero.']"
            clearable
            dense
            label="Salário mínimo"
            outlined
            type="number"
            class="flex-1"
          />

          <q-input
            v-model="model.salary1"
            :min="model.salary0"
            clearable
            dense
            label="Salário máximo"
            outlined
            type="number"
            :rules="[
              (s: number) => (isDefined(s) ? Number(s) > 0 : true) ?? 'Valor mínimo deve ser maior que zero.',
              (s: number) => (isDefined(s) && isDefined(model.salary0)
                ? Number(s) > Number(model.salary0)
                : true
              ) ?? 'Valor máximo deve ser maior que o valor mínimo.',
            ]"
            class="flex-1"
          />
        </div>

        <q-btn color="primary" label="Postar" type="submit" />
      </q-form>
    </q-card>
  </q-page>
</template>
