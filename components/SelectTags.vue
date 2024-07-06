<script lang="ts" setup>
import type { QSelect, QSelectProps } from 'quasar'

const model = defineModel<string[]>({
  default: [],
})

const { data } = await useFetch('/api/tags')

const fullOptions = data.value?.map(tag => ({ label: tag.name, value: tag.id })) ?? []
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
    label="Tags"

    dense emit-value outlined map-options use-input use-chips multiple
    @filter="filterFn"
  />
</template>
