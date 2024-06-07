<script lang="ts" setup>
const route = useRoute()
const companyId = computed(() => route.params.id as string)

if (!companyId.value)
  await navigateTo('/empresas')

const { data } = await useFetch('/api/companies', {
  method: 'GET',
  query: { id: companyId.value },
})
const company = computed(() => data.value?.data?.[0])

if (!company.value)
  await navigateTo('/empresas')
</script>

<template>
  <div mx-auto max-w-400>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_300px]">
      <aside hidden lg:block space-y-6>
        <div primary-border>
          <h3 p-4>
            Resumo
          </h3>
          <div px-4 pb-5 space-y-4>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Matriz
              </div>
              <div>TODO: LOCALIZAÇÃO</div>
            </div>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Modelos de Trabalho
              </div>
              <div>TODO: MODELOS (REMOTO, LOCAL, HIBRIDO)</div>
            </div>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Locais de Contratação
              </div>
              <div>TODO: LOCAIS</div>
            </div>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Tamanho
              </div>
              <div>TODO: QUANTIDADE DE PESSOAS</div>
            </div>
          </div>
        </div>
        <div sticky top-12 duration-500 ease-in-out>
          ADS
        </div>
      </aside>

      <div space-y-6>
        <div class="relative flex gap-4 overflow-hidden primary-border px-4 py-6 lg:mx-0 space-y-1.5 lg:px-6 lg:py-6 md:px-8">
          <CompanyAvatar :src="company?.logo" :name="company?.name ?? ''" size="68px" />
          <div flex flex-col>
            <h1>{{ company?.name }}</h1>
            <div>Company short desc</div>
          </div>
        </div>

        <SearchProcesses :company-id="companyId" />
      </div>

      <aside hidden xl:block space-y-6>
        <div primary-border>
          <h3 p-4>
            Contato
          </h3>
          <div px-4 pb-5 space-y-4>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Website
              </div>
              <div>TODO: Website</div>
            </div>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Redes
              </div>
              <div>TODO: Redes Sociais</div>
            </div>
          </div>
        </div>
        <div sticky top-12 duration-500 ease-in-out>
          ADS
        </div>
      </aside>
    </div>
  </div>
</template>

<style>

</style>
