<script lang="ts" setup>
const { data } = await useFetch('/api/processes', {
  method: 'GET',
  query: {
    orderBy: 'createdAt',
  },
  server: false,
})
</script>

<template>
  <div>
    <h2>Latest Opportunities</h2>
    <div
      v-for="process in data?.data"
      :key="process.id"
      b="1 primary-dark rd-2"
      p4
    >
      <h3>{{ process.title }}</h3>
      <div class="grid grid-cols-2">
        <div>
          {{ process.company?.name }}
        </div>
        <div>{{ process.contractType }}</div>
        <div>{{ process.experienceLevel }}</div>
        <div>{{ process.salary_0 }} {{ !!process.salary_0 && !!process.salary_1 ? '-' : '' }} {{ process.salary_1 }}</div>
        <div>{{ $dayjs(process.createdAt).fromNow() }}</div>
      </div>
    </div>
  </div>
</template>
