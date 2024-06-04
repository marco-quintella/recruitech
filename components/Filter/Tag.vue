<script lang="ts" setup>
const model = defineModel<GetTagsResponse[0][]>({ default: [] })
const search = ref<string>()

const { data: tags, pending } = await useFetch<GetTagsResponse>('/api/tags', {
  method: 'GET',
  query: {
    search: computed(() => search.value?.length ? search.value : undefined),
  },
})

function onAdd(tag: GetTagsResponse[0]) {
  if (model.value.some(t => t.id === tag.id))
    return
  model.value.push(tag)
}
</script>

<template>
  <q-btn color="primary" dense unelevated label="Tags">
    <q-menu max-height="350px" flex flex-col gap-2 overflow-hidden p-2>
      <div flex justify-between gap-4>
        <span font-bold>Tags</span>

        <div
          v-close-popup cursor-pointer
          select-none text-primary
          hover:underline
          @click="model = []"
        >
          Limpar
        </div>
      </div>

      <q-input
        v-model="search"
        dense
        outlined
        placeholder="Buscar tag"
        debounce="350"
        clearable
      />

      <q-separator />

      <q-list overflow-auto>
        <q-item
          v-for="tag in tags"
          :key="tag.id"
          v-ripple
          v-close-popup
          clickable
          dense
          @click="onAdd(tag)"
        >
          <q-item-section>
            {{ tag.name }}
          </q-item-section>
        </q-item>
        <q-item v-if="!tags.length" dense>
          Nenhum resultado
        </q-item>
      </q-list>
      <q-inner-loading :showing="pending">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-menu>
  </q-btn>
</template>
