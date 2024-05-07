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
      flex cursor-pointer gap-4 p4
      @click="navigateTo(`/vagas/${process.id}`)"
    >
      <q-img
        v-if="process.company?.logo"
        :src="process.company?.logo"
        width="80px"
        height="80px"
        alt="Logo da empresa"
      />
      <div flex flex-col gap-2>
        <h3 hover:text-primary>
          {{ process.title }}
        </h3>
        <div class="grid grid-cols-2">
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
        </div>
      </div>
    </div>
  </div>
</template>
