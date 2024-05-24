<script lang="ts" setup>
const { data } = await useFetch('/api/processes', {
  method: 'GET',
  query: {
    orderBy: 'createdAt',
  },
})
</script>

<template>
  <div flex flex-col gap-4>
    <h2>Últimas Vagas</h2>
    <div
      v-for="process in data?.data"
      :key="process.id"
      b="2 primary rd-2"
      flex gap-4 p4
    >
      <q-img
        v-if="process.company?.logo"
        :src="process.company?.logo"
        width="70px"
        height="70px"
        alt="Logo da empresa"
        min-h-70px min-w-70px
      />
      <div flex flex-col gap-2>
        <h3
          cursor-pointer hover:text-primary
          @click="navigateTo(`/vagas/${process.id}`)"
        >
          {{ process.title }}
        </h3>
        <div class="grid grid-cols-3 gap-2">
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
            <div flex-1 truncate>
              {{ process.tags.reduce((acc, curr, index) => {
                acc += curr.name + (index !== process.tags.length - 1 ? ', ' : '')
                return acc
              }, '') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
