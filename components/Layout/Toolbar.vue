<script setup lang="ts">
const $q = useQuasar()

async function onLogout() {
  $q.dialog({
    title: 'Sair',
    message: 'Deseja realmente sair?',
    ok: 'Sim',
    cancel: 'Não',
  }).onOk(async () => {
    try {
      $q.loading.show()
      await authLogout()
    }
    catch (e: any) {
      $q.notify({
        type: 'negative',
        message: e.data?.message || e.message || 'Erro ao sair',
      })
    }
    finally {
      $q.loading.hide()
    }
  })
}
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
    <q-btn color="secondary" text-color="secondary-text" class="!hidden !md:flex" unelevated no-caps rounded font-bold !py-1>
      Postar Vaga
    </q-btn>
    <q-btn flat round>
      <div i-ph-user text-6 />

      <q-menu auto-close>
        <q-list style="min-width: 100px">
          <q-item clickable @click="navigateTo('/configuracoes')">
            <q-item-section avatar>
              <div i-ph-gear text-5 />
            </q-item-section>
            <q-item-section>Configurações</q-item-section>
          </q-item>

          <q-item clickable @click="onLogout">
            <q-item-section avatar>
              <div i-ph-sign-out text-5 />
            </q-item-section>
            <q-item-section>Sair</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </nav>
</template>

<style lang="sass">

</style>
