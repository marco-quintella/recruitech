<script lang="ts" setup>
import type { QImgProps } from 'quasar'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

if (!user.value?.companyId)
  navigateTo('/')

const { data: company } = await useFetch('/api/companies/user')
</script>

<template>
  <div h-full flex gap-4>
    <div text-center>
      <q-img v-if="company?.logo" :src="company.logo" :ratio="1" width="80px" height="80px" />
      <h2 text-center text-6 font-semibold>
        {{ company?.name }}
      </h2>
      <q-list style="min-width: 100px">
        <q-item clickable @click="navigateTo('/minha-empresa/usuarios')">
          <q-item-section avatar>
            <div i-ph-users text-5 />
          </q-item-section>
          <q-item-section>Usuários</q-item-section>
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

        <q-item
          clickable
          @click="navigateTo('/minha-empresa/processos')"
        >
          <q-item-section avatar>
            <div i-ph-clipboard text-5 />
          </q-item-section>
          <q-item-section>Processos</q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-separator vertical />
    <NuxtPage />
  </div>
</template>
