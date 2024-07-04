<script lang="ts" setup>
const route = useRoute()
const processId = computed(() => route.params.id)

const { data: processResponse } = await useFetch(`/api/processes`, {
  method: 'get',
  params: {
    id: processId,
  },
})

const process = computed(() => processResponse.value?.data?.[0])

const { data: profile } = await useFetch('/api/profiles/me')
const tags = computed(() => profile.value?.tags.map(tag => tag.name).join(', '))
</script>

<template>
  <div v-if="profile && process">
    <h1>Apply for <span text-primary> {{ process.title }} </span></h1>
    <div>Confirm that you are sharing your profile as follows:</div>
    <div>Apresentação: {{ profile.presentation }}</div>
    <div>Tags: {{ tags }}</div>
    <div>CV: {{ !profile.file ? 'Nenhum arquivo enviado' : profile.file.updatedAt }}</div>

    <q-btn
      color="primary"
      no-caps w-full
      @click="apply"
    >
      Confirmar Candidatura
    </q-btn>

    <pre>{{ profile }}</pre>
  </div>
</template>
