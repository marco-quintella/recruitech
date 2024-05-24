<script lang="ts" setup>
import type { Favorite } from '../../db/favorites'

const $q = useQuasar()
const { public: { frontend: { url } } } = useRuntimeConfig()

const route = useRoute()
const id = computed(() => route.params.id as string)

const { data } = await useFetch('/api/processes', {
  method: 'get',
  query: {
    id,
  },
})

const process = computed(() => data.value?.data?.[0])

const { loggedIn, session } = useAuth()

const favorites = ref<Favorite[]>()
if (loggedIn && session.value?.data?.role === 'candidate') {
  const { data: favoriteData } = await useFetch('/api/favorites', {
    method: 'get',
    query: {
      userId: session.value?.data?.id,
    },
  })
  if (favoriteData.value)
    favorites.value = favoriteData.value
}

const isFavorite = computed(() => !!favorites.value?.length)

async function onFavorite() {
  if (!loggedIn.value)
    return await navigateTo('/auth/login')

  try {
    $q.loading.show()
    if (!isFavorite.value) {
      const newFavorite = await $fetch('/api/favorites', {
        body: {
          processId: id.value,
        },
        method: 'POST',
      })
      favorites.value = [newFavorite]
    }
    else {
      await $fetch('/api/favorites', {
        body: {
          processId: id.value,
        },
        method: 'DELETE',
      })
      favorites.value = []
    }
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao salvar',
      type: 'negative',
    })
  }
  finally {
    $q.loading.hide()
  }
}

function onCopy() {
  navigator.clipboard.writeText(`${url}/vagas/${id.value}`)
  $q.notify({
    color: 'primary',
    message: 'Link copiado',
  })
}
</script>

<template>
  <div flex justify-center md:p-8>
    <div v-if="process" flex="~ col" max-w-200 w-2xl gap-4>
      <!-- Header -->
      <div flex gap-4>
        <q-img
          :src="process.company?.logo ?? undefined"
          width="48px"
          height="48px"
          :alt="`Logo da ${process.company?.name}`"
        />
        <div flex="~ col 1" gap-2>
          <h1>{{ process.title }}</h1>
          <div grid grid-cols-1 w-full gap-2 md:grid-cols-3 sm:grid-cols-2>
            <div flex items-center gap-1>
              <div i-ph-building />
              {{ process.company?.name }}
            </div>
            <div v-if="process.contractType" flex items-center gap-1>
              <div i-ph-file />
              {{ parseContractType(process.contractType) }}
            </div>
            <div
              v-if="process.experienceLevel"
              flex items-center gap-1
            >
              <div i-ph-ranking />
              {{ parseExperienceLevel(process.experienceLevel) }}
            </div>
            <div
              v-if="!!process.salary_0 || !!process.salary_1"
              flex items-center gap-1
            >
              <div i-ph-money />
              {{ process.salary_0 }} {{ !!process.salary_0 && !!process.salary_1 ? '-' : '' }} {{ process.salary_1 }}
            </div>
            <div flex items-center gap-1>
              <div i-ph-calendar />
              {{ $dayjs(process.createdAt).fromNow() }}
            </div>
            <div flex items-center gap-1>
              <div i-ph-tag />
              <div flex-1>
                {{ process.tags.reduce((acc, curr, index) => {
                  acc += curr.name + (process && index !== process.tags.length - 1 ? ', ' : '')
                  return acc
                }, '') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Comandos -->
      <div flex gap-2>
        <q-btn
          v-if="session?.data?.role !== 'recruiter' && session?.data?.role !== 'company_admin'"
          color="primary"
          size="sm"
          no-caps
          :outline="!isFavorite"
          @click="onFavorite"
        >
          <div
            class="mr-2" :class="{
              'i-ph-star': !isFavorite,
              'i-ph-star-fill text-amber': isFavorite,
            }"
          />
          Favorito
        </q-btn>
        <q-btn
          color="primary"
          no-caps
          outline
          size="sm"
          @click="onCopy"
        >
          <div i-ph-clipboard mr-2 />
          Copiar Link
        </q-btn>
        <q-btn
          color="primary"
          no-caps
          outline
          size="sm"
        >
          <div i-ph-x-circle mr-2 />
          Reportar
        </q-btn>
      </div>
      <!-- Descrição -->
      <div>{{ process.description }}</div>
      <div>
        <q-btn
          v-if="process.processType === ProcessTypeEnum.platform"
          color="primary"
          w-full
        >
          Candidatar-se
        </q-btn>

        <q-btn
          v-else-if="process.processType === ProcessTypeEnum.link"
          color="primary"
          w-full
        >
          Candidatar-se
          <div i-ph-arrow-up-right ml-2 />
        </q-btn>

        <div
          v-else-if="process.processType === ProcessTypeEnum.email"
          class="w-full b-1 b-primary b-rd-2 p-2"
        >
          Candidate-se através do email: {{ process.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
