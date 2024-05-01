<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>

<template>
  <div w-full flex justify-center>
    <div max-w-320 w-full flex flex-col gap-8>
      <HomePageHero w-full />
      <div w-full flex flex-col gap-8 sm:flex-row>
        <div w-full sm:max-w-80>
          <div
            flex flex-col gap-2 b-rd-2 bg-gradient-from-primary
            bg-gradient-to-secondary bg-gradient-linear
            bg-gradient-shape-b p-4 text-white
          >
            <h2>Poste uma Vaga</h2>
            <p class="text-balance">
              Alcance profissionais da indústria tech de maneira facilitada e prática, sem abrir mão das práticas da sua empresa.
            </p>
            <ul>
              <li>Anuncie por 28 dias</li>
              <li>E-mails de alerta com candidatos em potencial</li>
            </ul>
            <q-btn color="primary" mt-2 rounded>
              Postar Vaga
            </q-btn>
          </div>
        </div>
        <LatestOpportunities flex-1 />
      </div>
    </div>
  </div>
</template>
