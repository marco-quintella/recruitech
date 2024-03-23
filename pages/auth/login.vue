<script setup lang="ts">
import { z } from 'zod'

const model = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined,
})

async function onSubmit() {
  if (!model.email || !model.password)
    return

  if (z.string().email().safeParse(model.email).success === false)
    return

  authLogin(model.email, model.password)
}
</script>

<template>
  <div class="flex justify-center">
    <form class="max-w-150 flex flex-col items-center gap-4" @submit.prevent="onSubmit">
      <b-input v-model="model.email" label="E-mail" name="email" />
      <b-input v-model="model.password" label="Senha" name="password" type="password" />
      <button type="submit">
        Entrar
      </button>
    </form>
  </div>
</template>

<style lang="scss">

</style>
