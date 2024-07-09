<script lang="ts" setup>
import type { GetProcessesResponse } from '~/server/api/processes/index.get'

defineProps<{ process: GetProcessesResponse['data'][0] }>()
</script>

<template>
  <nuxt-link
    b="2 primary rd-2 hover:l-12"
    flex
    cursor-pointer
    gap-4
    p4
    text-background-text
    ring-primary
    transition-all
    ease-in-out
    hover:ring-2
    :to="`/vagas/${process.id}`"
  >
    <CompanyAvatar
      v-if="process.company?.logo"
      :src="process.company?.logo"
      :name="process.company?.name ?? ''"
      size="48px"
    />
    <div flex flex-col gap-2>
      <h3>
        {{ process.title }}
      </h3>
      <div class="flex flex-wrap gap-x-4 gap-y-2">
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
        <div
          v-for="tag of process.tags"
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
    </div>
  </nuxt-link>
</template>
