<script lang="ts" setup>
const route = useRoute()
const token = route.name === 'auth-confirmar-email-token' ? route.params.token : undefined

const { error } = await useFetch('/api/auth/confirm-email', {
  body: { token },
  method: 'POST',
})
</script>

<template>
  <q-page padding flex flex-col items-center justify-center>
    <h1>Confirmar E-mail</h1>
    <br>
    <p v-if="!error" font-semibold>
      E-mail confirmado com sucesso. <NuxtLink to="/auth/login">
        Clique aqui para entrar.
      </NuxtLink>
    </p>
    <p v-else text-red font-semibold>
      {{ error.data.message }}
    </p>
  </q-page>
</template>

<style>

</style>
