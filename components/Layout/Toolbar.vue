<script setup lang="ts">

</script>

<template>
  <nav p="x-4 y-2" text-primary-text h-13 w-full flex items-center justify-between gap-16 bg-primary>
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
    <div text-secondary-text hidden b-rd-2 bg-secondary px-4 py-2 text-3 font-bold md:flex>
      Postar Vaga
    </div>
    <div i-ph-user text-6 />
  </nav>
</template>

<style lang="sass">

</style>
