<script setup lang="ts">
import { RoleEnum } from '~~/server/utils/enums'

const emit = defineEmits(['toggle-drawer'])

const $q = useQuasar()

const { loggedIn, session } = useAuth()

const isCompanyOrAdmin = computed(() => session.value?.data?.role && session.value.data.role !== RoleEnum.candidate)
const isCandidate = computed(() => session.value?.data?.role === RoleEnum.candidate)

async function onLogout() {
  $q.dialog({
    cancel: 'Não',
    message: 'Deseja realmente sair?',
    ok: 'Sim',
    title: 'Sair',
  }).onOk(async () => {
    try {
      $q.loading.show()
      await authLogout()
    }
    catch (e: any) {
      $q.notify({
        message: e.data?.message || e.message || 'Erro ao sair',
        type: 'negative',
      })
    }
    finally {
      $q.loading.hide()
    }
  })
}
</script>

<template>
  <q-header>
    <q-toolbar p="x-4 y-2" h-13 w-full flex items-center justify-between gap-16 bg-primary text-primary-text>
      <div i-ph-list text-6 md:hidden @click="emit('toggle-drawer')" />
      <Logo cursor-pointer color2="primary-text" @click="navigateTo('/')" />
      <div flex="1" hidden gap-4 text-4 font-bold md:flex>
        <layout-menu-link v-if="isCompanyOrAdmin" to="/candidatos">
          Candidatos
        </layout-menu-link>
        <layout-menu-link to="/vagas">
          Vagas
        </layout-menu-link>
        <layout-menu-link to="/empresas">
          Empresas
        </layout-menu-link>
        <layout-menu-link v-if="isCandidate" to="/minhas-candidaturas">
          Minhas Candidaturas
        </layout-menu-link>
        <!-- <layout-menu-link>Notícias</layout-menu-link> -->
        <!-- <layout-menu-link hidden lg:block>
          Preparação
        </layout-menu-link> -->
      </div>
      <q-btn
        v-if="session?.data?.role !== RoleEnum.candidate"
        color="secondary"
        text-color="secondary-text"
        class="rounded font-bold !hidden !py-1 !md:flex"
        unelevated
        no-caps
        :to="loggedIn ? '/vagas/postar' : '/auth/registrar'"
      >
        Postar Vaga
      </q-btn>
      <q-btn flat round>
        <div i-ph-user text-6 />

        <q-menu auto-close>
          <q-list v-if="loggedIn" style="min-width: 100px">
            <q-item
              v-if="session?.data.role === RoleEnum.candidate"
              clickable
              @click="navigateTo('/meu-perfil')"
            >
              <q-item-section avatar>
                <div i-ph-user text-5 />
              </q-item-section>
              <q-item-section>Perfil</q-item-section>
            </q-item>

            <q-item
              v-else
              clickable
              @click="navigateTo('/minha-empresa')"
            >
              <q-item-section avatar>
                <div i-ph-buildings-duotone text-5 />
              </q-item-section>
              <q-item-section>Empresa</q-item-section>
            </q-item>

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

          <q-list v-else style="min-width: 100px">
            <q-item clickable @click="navigateTo('/auth/login')">
              <q-item-section avatar>
                <div i-ph-sign-in text-5 />
              </q-item-section>
              <q-item-section>Entrar</q-item-section>
            </q-item>

            <q-item clickable @click="navigateTo('/auth/registrar')">
              <q-item-section avatar>
                <div i-ph-user-plus text-5 />
              </q-item-section>
              <q-item-section>Registrar</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
