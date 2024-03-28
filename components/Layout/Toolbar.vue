<script setup lang="ts">

</script>

<template>
  <nav p="x-4 y-2" h-13 w-full flex items-center justify-between gap-16 bg-primary text-primary-text>
    <div i-ph-list text-6 md:hidden />
    <Logo color2="primary-text" />
    <div flex="1" hidden gap-4 text-4 font-bold md:flex>
      <div>Vagas</div>
      <div>Empresas</div>
      <div>Notícias</div>
      <div hidden lg:block>
        Preparação
      </div>
    </div>
    <q-btn color="secondary" class="!hidden !md:flex" unelevated no-caps rounded font-bold !py-1>
      Postar Vaga
    </q-btn>
    <div i-ph-user text-6 />
  </nav>
</template>

<style lang="sass">

</style>
