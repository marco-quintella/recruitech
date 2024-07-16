<script lang="ts" setup>

</script>

<template>
  <div
    flex flex-col gap-4 b-rd-2 from-secondary
    to-primary bg-gradient-to-tl px8 py16 text-white
  >
    <h1>
      A <span class="text-secondary font-700">GetJobs.Tech</span> está aqui para ajudar empresas e profissionais
      a facilitar o seu processo de recrutamento e seleção.
    </h1>
    <div>
      Mais e mais empresas utilizam processos rápidos em simples
      na hora de contratar novos talentos. A GetJobs.Tech é uma plataforma
      que conecta empresas e profissionais de maneira rápida e eficiente.
    </div>
    <div mt-4 flex gap-8>
      <q-btn color="secondary" rounded to="/planos">
        Recrutar
      </q-btn>
      <q-btn color="primary" rounded to="/vagas">
        Buscar Vagas
      </q-btn>
    </div>
  </div>
</template>

<style>

</style>
