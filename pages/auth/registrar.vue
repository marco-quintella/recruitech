<script setup lang="ts">
import { z } from 'zod'
import type { Role } from '~/db/role'

const model = reactive({
  name: undefined as string | undefined,
  email: undefined as string | undefined,
  password: undefined as string | undefined,
  role: 'candidate' as Role,
})

const isValid = computed(() => !!model.name && !!model.email && !!model.password)

function onSubmit() {
  if (!model.name || !model.email || !model.password)
    return

  if (z.string().email().safeParse(model.email).success === false)
    return

  authRegister({
    name: model.name,
    email: model.email,
    password: model.password,
    role: model.role,
  })
}
</script>

<template>
  <div class="flex justify-center pt-10vh">
    <form
      max-w-100
      w-full
      flex="~ col"
      items-center
      gap-4
      b="1 primary solid rd-3"
      p-8
      @submit.prevent="onSubmit"
    >
      <h1>Registrar</h1>
      <b-input v-model="model.name" label="Nome" name="name" />
      <b-input v-model="model.email" label="E-mail" name="email" />
      <b-input v-model="model.password" label="Senha" name="password" type="password" />
      <b-button type="submit" primary :disabled="!isValid">
        Cadastrar
      </b-button>
      <p>
        Já é cadastrado? <nuxt-link hoverable to="/auth/login">
          Entre aqui!
        </nuxt-link>
      </p>
    </form>
  </div>
</template>

<style lang="sass">

</style>
