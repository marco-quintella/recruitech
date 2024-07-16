<script lang="ts" setup>
const search = ref<string>()

const { data } = await useFetch('/api/companies', {
  method: 'GET',
  query: {
    search: computed(() => search.value?.length ? search.value : undefined),
  },
})
const companies = computed(() => data.value?.data)
</script>

<template>
  <q-page padding flex justify-center>
    <div max-w-4xl w-full flex flex-col gap-4>
      <h2>Empresas</h2>

      <div flex="~ col gap-2">
        <div>
          <q-input
            v-model="search"
            placeholder="Buscar Empresas"
            dense
            outlined
            clearable
            debounce="750"
          />
        </div>

        <div flex gap-2>
          <nuxt-link
            v-for="company of companies"
            :key="company.id"
            :to="`/empresas/${company.id}`"
            b="2 primary rd-2 hover:l-12"
            flex="~ 1"
            cursor-pointer
            gap-4
            p4
            text-background-text
            ring-primary
            transition-all
            ease-in-out
            hover:ring-2
          >
            <q-img
              v-if="company?.logo"
              :src="company?.logo"
              width="70px"
              height="70px"
              alt="Logo da empresa"
              min-h-70px min-w-70px
            />
            <div flex="~ col gap-4" justify-center>
              <h3>
                {{ company.name }}
              </h3>
              <p>{{ company._count?.processes }} vagas</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </q-page>
</template>
