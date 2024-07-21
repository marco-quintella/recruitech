<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <q-page padding>
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div>Página não encontrada</div>
    <div>
      <q-btn color="primary" m="3 t8" @click="router.back()">
        Voltar
      </q-btn>
    </div>
  </q-page>
</template>
