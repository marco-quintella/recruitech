<script lang="ts" setup>
const route = useRoute()
const companyId = computed(() => route.params.id as string)

if (!companyId.value)
  await navigateTo('/empresas')

const { data: company } = await useFetch('/api/companies/details', {
  method: 'GET',
  query: { id: companyId.value },
})

if (!company.value)
  await navigateTo('/empresas')

const hq = computed(() => company.value?.locations
  ? [
      company.value?.locations?.country,
      company.value?.locations?.state,
      company.value?.locations?.city,
    ].filter(Boolean).join(', ')
  : undefined)

const contractTypes = computed(() => company.value?.processesTypes?.length
  ? company.value?.processesTypes.map(
    type => contractTypeOptions.find(op => op.value === type)?.label,
  )
  : undefined)
</script>

<template>
  <q-page v-if="company" padding>
    <div class="grid grid-cols-1 mx-auto max-w-400 gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_300px]">
      <aside hidden lg:block space-y-6>
        <div primary-border>
          <h3 p-4>
            Resumo
          </h3>
          <div px-4 pb-5 space-y-4>
            <div v-if="hq" class="space-y-2">
              <div class="text-primary font-600">
                Matriz
              </div>
              <q-chip dense>
                <q-img
                  v-if="company.locations?.country"
                  :src="`https://flagsapi.com/${company.locations.country}/flat/64.png`"
                  size="16px"
                  mr-1
                />
                {{ hq }}
              </q-chip>
            </div>
            <div v-if="contractTypes" class="space-y-2">
              <div class="text-primary font-600">
                Modelos de Trabalho
              </div>
              <q-chip v-for="t of contractTypes" :key="t" dense>
                {{ t }}
              </q-chip>
            </div>
            <div v-if="company.availableLocations" class="space-y-2">
              <div class="text-primary font-600">
                Locais de Contratação
              </div>
              <location-badges :locations="company.availableLocations" />
            </div>
            <div v-if="company.companySize" class="space-y-2">
              <div class="text-primary font-600">
                Tamanho
              </div>
              <div>
                {{
                  companySizeOptions.find(
                    op => op.value === company?.companySize,
                  )?.label
                }} colaboradores
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div space-y-6>
        <div class="relative flex gap-4 overflow-hidden primary-border px-4 py-6 lg:mx-0 space-y-1.5 lg:px-6 lg:py-6 md:px-8">
          <CompanyAvatar :src="company.logo" :name="company.name ?? ''" size="68px" />
          <div flex flex-col>
            <h1>
              {{ company.name }}
            </h1>
            <div>{{ company.shortDescription }}</div>
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
            <div v-if="company.website" class="space-y-2">
              <div class="text-primary font-600">
                Website
              </div>
              <div flex items-center gap-2>
                <div i-ph-link />
                <a href="company.website" target="_blank">{{ company.website }}</a>
              </div>
            </div>
            <div class="space-y-2">
              <div class="text-primary font-600">
                Redes
              </div>
              <div class="flex flex-col gap-2">
                <div v-if="company.linkedin" flex items-center gap-2>
                  <div i-ph-linkedin-logo />
                  <a target="_blank" :href="company.linkedin">LinkedIn</a>
                </div>
                <div v-if="company.twitter" flex items-center gap-2>
                  <div i-ph-twitter-logo />
                  <a target="_blank" :href="company.twitter">Twitter</a>
                </div>
                <div v-if="company.facebook" flex items-center gap-2>
                  <div i-ph-facebook-logo />
                  <a target="_blank" :href="company.facebook">Facebook</a>
                </div>
                <div v-if="company.instagram" flex items-center gap-2>
                  <div i-ph-instagram-logo />
                  <a target="_blank" :href="company.instagram">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </q-page>
</template>

<style>

</style>
