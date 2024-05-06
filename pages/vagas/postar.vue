<script lang="ts" setup>
import SelectExperienceLevel from '~/components/SelectExperienceLevel.vue'
import SelectProcessType from '~/components/SelectProcessType.vue'
import type { ProcessInsert } from '~/db/processes'

const $q = useQuasar()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const model = ref<ProcessInsert>({
  companyId: '',
  contractType: ContractTypeEnum.full_time,

  description: '',

  email: '',
  experienceLevel: undefined,
  link: '',

  processType: ProcessTypeEnum.platform,
  salary_0: undefined,
  salary_1: undefined,

  title: '',
  userId: '',
})

// Route protection
watch(user, () => {
  if (!user.value)
    return navigateTo('/login')

  if (
    !user.value?.companyId
    || ![RoleEnum.company_admin, RoleEnum.recruiter].includes(user.value?.role)
  )
    return navigateTo('/')
}, { immediate: true })

async function onSave() {
  try {
    $q.loading.show()
    await $fetch('/api/processes', {
      body: {
        ...model.value,
        companyId: user.value?.companyId,
        salary_0: Number(model.value.salary_0),
        salary_1: Number(model.value.salary_1),
        userId: user.value?.id,
      },
      method: 'POST',
    })

    navigateTo('/minha-empresa/vagas')
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
  <div h-fit w-full flex flex-col items-center pt-12>
    <h1>Nova Vaga</h1>
    <q-card
      b="1 primary solid rd-3"
      flat max-w-100 w-full flex flex-col gap-2 p-8
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
                <li>- Recruitech: Realize o processo e gerencie os candidatos através da plataforma.</li>
                <li>- Email: Receba os currículos diretamente por e-mail. Candidatos podem enviar o currículos através da plataforma ou através do próprio e-mail.</li>
                <li>- Link: Utilize sua própria plataforma direcionando os candidatos para o seu link.</li>
              </ul>`,
            })"
          />
        </div>

        <q-input
          v-if="model.processType === ProcessTypeEnum.email"
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
          v-if="model.processType === ProcessTypeEnum.link"
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

        <SelectExperienceLevel
          v-model="model.experienceLevel"
          clearable
          class="mb-4"
        />

        <div flex gap-4>
          <q-input
            v-model="model.salary_0"
            label="Salário mínimo"
            outlined
            dense
            type="number"
            clearable
            :min="0"
            :rules="[(s: number) => (isDefined(s) ? s > 0 : true) ?? 'Valor mínimo deve ser maior que zero.']"
          />

          <q-input
            v-model="model.salary_1"
            label="Salário máximo"
            outlined
            dense
            type="number"
            clearable
            :min="model.salary_0"
            :rules="[
              (s: number) => (isDefined(s) ? Number(s) > 0 : true) ?? 'Valor mínimo deve ser maior que zero.',
              (s: number) => (isDefined(s) && isDefined(model.salary_0)
                ? Number(s) > Number(model.salary_0)
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
