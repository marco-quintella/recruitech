<script lang="ts" setup>
const { loggedIn } = useAuth()

if (!loggedIn.value)
  navigateTo('/auth/login')

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <q-page padding flex flex-col gap-4 md:flex-row>
    <div flex flex-col items-center gap-4>
      <h2 text-6 font-semibold>
        Configurações
      </h2>
      <q-list style="min-width: 100px" w-full flex flex-wrap md:block>
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
    <q-separator md:hidden />
    <q-separator vertical hidden md:block />
    <NuxtPage />
  </q-page>
</template>

<style></style>
