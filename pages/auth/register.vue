<script setup lang="ts">
import { z } from 'zod'
import type { Role } from '~/db/role'

const model = reactive({
  name: undefined as string | undefined,
  email: undefined as string | undefined,
  password: undefined as string | undefined,
  role: 'candidate' as Role,
})

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
  <div class="flex justify-center">
    <form class="max-w-150 flex flex-col items-center" @submit.prevent="onSubmit">
      <label for="name" class="flex flex-col">
        <div>Name</div>
        <input v-model="model.name" name="name">
      </label>
      <label for="email" class="flex flex-col">
        <div>E-mail</div>
        <input v-model="model.email" name="email">
      </label>
      <label for="password" class="flex flex-col">
        <div>Senha</div>
        <input v-model="model.password" name="password">
      </label>
      <button type="submit">
        Cadastrar
      </button>
    </form>
  </div>
</template>

<style lang="sass">

</style>
