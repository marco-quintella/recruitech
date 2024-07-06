<script lang="ts" setup>
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

if (!user.value?.companyId)
  navigateTo('/')

const { data: company } = await useFetch('/api/companies/user')

const menu = [
  {
    icon: 'i-ph-users',
    label: 'Usuários',
    path: '/minha-empresa/usuarios',
  },
  {
    condition: user.value?.role === 'company_admin',
    icon: 'i-ph-buildings',
    label: 'Empresa',
    path: '/configuracoes/empresa',
  },
  {
    icon: 'i-ph-clipboard',
    label: 'Processos',
    path: '/minha-empresa/processos',
  },
]
</script>

<template>
  <q-page
    padding
    flex
    gap-4
    :class="{
      'flex-col': !$q.screen.gt.sm,
    }"
  >
    <template v-if="$q.screen.gt.sm">
      <div flex flex-col items-center gap-4 text-center>
        <q-img v-if="company?.logo" :src="company.logo" :ratio="1" width="80px" height="80px" />
        <h2 text-center text-6 font-semibold>
          {{ company?.name }}
        </h2>
        <q-list style="min-width: 100px">
          <q-item
            v-for="item in menu"
            :key="item.label"
            clickable
            @click="navigateTo(item.path)"
          >
            <q-item-section avatar>
              <div text-5 :class="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-separator vertical />
    </template>
    <template v-else>
      <div class="flex items-center justify-center gap-4">
        <q-img v-if="company?.logo" :src="company.logo" :ratio="1" width="40px" height="40px" />
        <h2 text-center text-6 font-semibold>
          {{ company?.name }}
        </h2>
      </div>
      <div class="flex justify-around">
        <q-btn
          v-for="item in menu"
          :key="item.label"
          flat
          @click="navigateTo(item.path)"
        >
          <div text-5 :class="item.icon" />&nbsp;
          {{ item.label }}
        </q-btn>
      </div>
    </template>
    <NuxtPage />
  </q-page>
</template>
