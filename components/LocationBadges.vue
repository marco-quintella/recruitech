<script lang="ts" setup>
const props = defineProps<{
  locations?: {
    id?: string
    city?: string | null
    country: string
    createAt?: Date
    state?: string | null
    updatedAt?: Date
  }[]
}>()

const locationsMap = computed(() => props.locations?.length
  ? props.locations?.map(
    location => ({
      label: [location.country, location.state, location.city].filter(Boolean).join(', '),
      value: {
        city: location.city ?? undefined,
        country: location.country,
        state: location.state ?? undefined,
      },
    }),
  ).reduce(
    (acc: {
      label: string
      value: {
        city: string | undefined
        country: string
        state: string | undefined
      }
    }[], curr) => {
      if (!curr?.label || acc.some(entry => entry.label === curr?.label))
        return acc
      acc.push(curr)
      return acc
    },
    [],
  )
  : [])
</script>

<template>
  <q-chip v-for="{ label, value } of locationsMap" :key="label" dense>
    <q-img
      v-if="value.country"
      :src="`https://flagsapi.com/${value.country}/flat/64.png`"
      size="16px"
      mr-1
    />
    {{ label }}
  </q-chip>
</template>
