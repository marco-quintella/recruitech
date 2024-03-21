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
    <form class="max-w-150 flex flex-col items-center" @submit.prevent="onSubmit">
      <label for="email" class="flex flex-col">
        <div>E-mail</div>
        <input v-model="model.email" name="email">
      </label>
      <label for="password" class="flex flex-col">
        <div>Senha</div>
        <input v-model="model.password" name="password">
      </label>
      <button type="submit">
        Entrar
      </button>
    </form>
  </div>
</template>

<style lang="scss">

</style>
