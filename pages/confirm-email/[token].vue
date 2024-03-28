<script lang="ts" setup>
const route = useRoute()
const token = route.params.token

const { error } = await useFetch('/api/auth/confirm-email', {
  method: 'POST',
  body: { token },
})
</script>

<template>
  <div w-full flex flex-col items-center>
    <h1>Confirmar E-mail</h1>
    <p v-if="!error" font-semibold>
      E-mail confirmado com sucesso. <NuxtLink to="/auth/login">
        Clique aqui para entrar.
      </NuxtLink>
    </p>
    <p v-else text-red font-semibold>
      {{ error.data.message }}
    </p>
  </div>
</template>

<style>

</style>
