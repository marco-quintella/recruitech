<script setup lang="ts">
import { z } from 'zod'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const model = ref({
  nome: user.value?.name ?? '',
  email: user.value?.email ?? '',
})

const hasDiff = computed(() => {
  return model.value.nome !== user.value?.name || model.value.email !== user.value?.email
})
</script>

<template>
  <div h-fit w-full flex justify-center pt-12>
    <q-card
      flat
      max-w-100
      w-full
      p-8
      b="1 primary solid rd-3"
    >
      <q-form flex flex-col gap-2>
        <q-input
          v-model="model.nome"
          label="Nome"
          outlined
          dense
          :rules="[
            (v?: string) => !!v || 'Nome é obrigatório',
          ]"
        />

        <q-input
          v-model="model.email"
          label="E-mail"
          outlined
          dense
          :rules="[
            (v?: string) => !!v || 'E-mail é obrigatório',
            (v?: string) => z.string().email().safeParse(v).success || 'E-mail inválido',
          ]"
        />

        <q-btn
          v-if="hasDiff"
          color="primary"
          text-color="primary-text"
          label="Salvar"
        />
      </q-form>
    </q-card>
  </div>
</template>

<style lang="sass">

</style>
