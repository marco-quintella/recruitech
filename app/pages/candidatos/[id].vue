<script lang="ts" setup>
import { role } from '@prisma/client'

const $q = useQuasar()
const route = useRoute()
const candidateId = computed(() => route.params.id)

// User permission
const { session: user } = useAuth()
if (!user.value?.data?.role || user.value.data.role === role.candidate)
  navigateTo('/')

const { data: candidate, status } = await useFetch(() => `/api/candidates/${candidateId.value}`, {
  method: 'get',
})

const { data: favorites, refresh: refreshFavorites } = await useFetch('/api/favorites', {
  method: 'get',
  query: {
    candidateId: candidateId.value,
    userId: user.value?.id,
  },
})

const isFavorite = computed(() => !!favorites.value?.length)

async function createFavorite() {
  await $fetch('/api/favorites', {
    body: {
      candidateId: candidateId.value,
    },
    method: 'POST',
  })
}

async function deleteFavorite() {
  await $fetch('/api/favorites', {
    body: {
      candidateId: candidateId.value,
    },
    method: 'DELETE',
  })
}

const { data: discards, refresh: refreshDiscards } = await useFetch('/api/discards', {
  method: 'get',
  query: {
    candidateId: candidateId.value,
    userId: user.value?.id,
  },
})

const isDiscarted = computed(() => !!discards.value?.length)

async function createDiscard() {
  await $fetch('/api/discards', {
    body: {
      candidateId: candidateId.value,
    },
    method: 'POST',
  })
}

async function deleteDiscard() {
  await $fetch('/api/discards', {
    body: {
      candidateId: candidateId.value,
    },
    method: 'DELETE',
  })
}

async function onFavorite() {
  try {
    if (!isFavorite.value) {
      if (isDiscarted.value) {
        await deleteDiscard()
        refreshDiscards()
      }
      await createFavorite()
    }
    else {
      await deleteFavorite()
    }
    await refreshFavorites()
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao salvar',
      type: 'negative',
    })
  }
}

async function onDiscard() {
  try {
    if (!isDiscarted.value) {
      if (isFavorite.value) {
        await deleteFavorite()
        refreshFavorites()
      }
      await createDiscard()
    }
    else {
      await deleteDiscard()
    }
    await refreshDiscards()
  }
  catch (e: any) {
    $q.notify({
      message: e.data?.message || e.message || 'Erro ao salvar',
      type: 'negative',
    })
  }
}
</script>

<template>
  <q-page padding>
    <q-card
      flex="~ col gap-4"

      flat mx-auto max-w-4xl w-full
      b="1 primary solid rd-3"
      p4
    >
      <div class="flex flex-col gap-1">
        <div flex="~ justify-between items-center">
          <h1>
            {{ candidate?.user.name }}
          </h1>

          <div v-if="candidate?.cv">
            <nuxt-link :href="candidate.cv" target="_blank" flex items-center gap-1 text-5 hover:underline>
              <div class="i-ph-file-pdf" />
              CV
            </nuxt-link>
          </div>
        </div>

        <h2 v-if="candidate?.jobTitles?.length">
          {{ candidate.jobTitles.map(j => j.name).join(', ') }}
        </h2>

        <div v-if="candidate?.location">
          <location-badges :locations="[candidate.location]" />
        </div>

        <div flex="~ gap-2">
          <div
            v-for="tag of candidate?.tags"
            :key="tag.id"
            flex
            items-center
            gap-1
          >
            <div i-ph-tag />
            <div flex-1 truncate>
              {{ tag.name }}
            </div>
          </div>
        </div>

        <div flex="~ gap-2">
          <q-btn
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
            size="sm"
            no-caps
            :outline="!isDiscarted"
            @click="onDiscard"
          >
            <div
              class="mr-2" :class="{
                'i-ph-trash': !isDiscarted,
                'i-ph-trash-fill text-red': isDiscarted,
              }"
            />
            Descarte
          </q-btn>
        </div>
      </div>

      <div>{{ candidate?.presentation }}</div>

      <q-btn>Contatar</q-btn>

      <q-inner-loading :showing="status === 'pending'">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>
