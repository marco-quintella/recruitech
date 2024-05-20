<script setup lang="ts">
import { z } from 'zod'
import type { Role } from '~/db/role'

const $q = useQuasar()

const model = reactive({
  companyName: undefined as string | undefined,
  email: undefined as string | undefined,
  name: undefined as string | undefined,
  password: undefined as string | undefined,
  role: 'candidate' as Role,
})

async function onSubmit() {
  if (!model.name || !model.email || !model.password)
    return

  try {
    $q.loading.show()
    await authRegister({
      companyName: model.role === 'company_admin'
        ? model.companyName
        : undefined,
      email: model.email,
      name: model.name,
      password: model.password,
      role: model.role,
    })
  }
  catch (e: any) {
    $q.notify({
      color: 'negative',
      icon: 'report_problem',
      message: e.data?.message || 'Erro ao fazer login',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <div class="flex justify-center pt-10vh">
    <q-card
      flat max-w-100 w-full p-8
      b="1 primary solid rd-3"
    >
      <q-form
        w-full
        flex="~ col"
        items-center
        gap-4
        @submit.prevent="onSubmit"
      >
        <h1>Registrar</h1>

        <div flex flex-col items-center>
          <legend>
            Escolha o tipo de cadastro
          </legend>
          <div flex gap-4>
            <q-radio v-model="model.role" val="candidate" label="Cadidato" />
            <q-radio v-model="model.role" val="company_admin" label="Empresa" />
          </div>
        </div>

        <div w-full>
          <q-input
            v-if="model.role === 'company_admin'"
            v-model="model.companyName"
            label="Nome da empresa"
            outlined dense
            :rules="[
              (v?: string) => model.role === 'company_admin' ? (!!v || 'Nome da empresa é obrigatório') : true,
            ]"
          />
        </div>

        <div w-full>
          <q-input
            v-model="model.name"
            label="Nome"
            outlined dense w-full
            :rules="[
              (v?: string) => !!v || 'Nome é obrigatório',
            ]"
          />
        </div>

        <div w-full>
          <q-input
            v-model="model.email"
            label="E-mail"
            outlined dense w-full
            :rules="[
              (v?: string) => !!v || 'E-mail é obrigatório',
              (v?: string) => z.string().email().safeParse(v).success || 'E-mail inválido',
            ]"
          />
        </div>

        <div w-full>
          <q-input
            v-model="model.password"
            label="Senha"
            type="password"
            outlined dense w-full
            :rules="[
              (v?: string) => !!v || 'Senha é obrigatória',
            ]"
          />
        </div>

        <q-btn
          type="submit"
          color="primary"
          text-color="primary-text"
        >
          Cadastrar
        </q-btn>
        <p>
          Já é cadastrado? <nuxt-link hoverable to="/auth/login">
            Entre aqui!
          </nuxt-link>
        </p>
      </q-form>
    </q-card>
  </div>
</template>

<style lang="sass">

</style>
