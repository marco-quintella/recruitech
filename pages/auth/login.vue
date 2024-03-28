<script setup lang="ts">
import { z } from 'zod'

const $q = useQuasar()

const model = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined,
})

const error = ref<string>()

async function onSubmit() {
  if (!model.email || !model.password)
    return

  try {
    $q.loading.show()
    await authLogin(model.email, model.password)
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || 'Erro ao fazer login',
      color: 'negative',
      icon: 'report_problem',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <div class="w-full flex justify-center pt-10vh">
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form
        w-full
        flex="~ col"
        items-center
        gap-4
        @submit.prevent="onSubmit"
      >
        <h1>Login</h1>
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
            outlined
            dense
            w-full
            :rules="[
              (v?: string) => !!v || 'Senha é obrigatória',
            ]"
          />
        </div>
        <p v-if="error" text-red-5>
          {{ error }}
        </p>
        <q-btn
          type="submit"
          color="primary"
          text-color="primary-text"
        >
          Entrar
        </q-btn>
        <p>
          Ainda não tem cadastro? <nuxt-link hoverable to="/auth/registrar">
            Registre-se!
          </nuxt-link>
        </p>
      </q-form>
    </q-card>
  </div>
</template>

<style lang="scss">

</style>
