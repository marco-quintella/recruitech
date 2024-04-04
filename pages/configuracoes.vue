<script lang="ts" setup>
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div h-full flex gap-4>
    <div>
      <h2 text-6 font-semibold>
        Configurações
      </h2>
      <q-list style="min-width: 100px">
        <q-item clickable @click="navigateTo('/configuracoes/usuario')">
          <q-item-section avatar>
            <div i-ph-user text-5 />
          </q-item-section>
          <q-item-section>Usuário</q-item-section>
        </q-item>

        <q-item
          v-if="user?.role === 'company_admin'"
          clickable
          @click="navigateTo('/configuracoes/empresa')"
        >
          <q-item-section avatar>
            <div i-ph-buildings text-5 />
          </q-item-section>
          <q-item-section>Empresa</q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-separator vertical />
    <NuxtPage />
  </div>
</template>

<style></style>
