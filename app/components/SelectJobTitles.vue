<script lang="ts" setup>
import type { QSelect, QSelectProps } from 'quasar'

const model = defineModel<string[]>({
  default: [],
})

const { data } = await useFetch('/api/job-titles')

const fullOptions = data.value?.map(jobTitle => ({ label: jobTitle.name, value: jobTitle.id })) ?? []
const options = ref(fullOptions)

type FilterFn = NonNullable<QSelectProps['onFilter']>
type FilterFnValue = Parameters<FilterFn>['0']
type FilterFnUpdate = Parameters<FilterFn>['1']
type FilterFnAbort = Parameters<FilterFn>['2']

function filterFn(val: FilterFnValue, update: FilterFnUpdate, _abort: FilterFnAbort) {
  update(() => {
    const needle = val.toLocaleLowerCase()
    options.value = fullOptions.filter(v => v.label.toLocaleLowerCase().includes(needle))
  })
}
</script>

<template>
  <q-select
    v-model="model"
    :options="options"
    input-debounce="350"
    label="Título da Função"
    dense
    emit-value
    map-options
    outlined
    use-chips
    use-input
    multiple
    @filter="filterFn"
  />
</template>
