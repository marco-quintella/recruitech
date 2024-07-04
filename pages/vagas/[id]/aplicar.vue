<script lang="ts" setup>
const $q = useQuasar()
const route = useRoute()
const processId = computed(() => route.params.id)

const { data: processResponse } = await useFetch(`/api/processes`, {
  method: 'get',
  params: {
    id: processId,
  },
})

const process = computed(() => processResponse.value?.data?.[0])

const { data: profile } = await useFetch('/api/profiles/me')
const tags = computed(() => profile.value?.tags.map(tag => tag.name).join(', '))

async function onApply() {
  try {
    if (!profile.value?.id)
      return

    $q.loading.show()

    await $fetch('/api/processes/apply', {
      body: {
        processId: processId.value,
      },
      method: 'post',
    })
  }
  catch (e: any) {
    $q.notify({
      message: e.message,
      type: 'negative',
    })
  }
  finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <q-page padding flex justify-center>
    <div h-fit max-w-4xl w-full flex flex-col gap-4 b-1 b-primary b-rd-2xl p4>
      <div v-if="profile && process" flex flex-col gap-4>
        <h1>
          Candidatar-se a <span text-primary> {{ process.title }} </span> em
          <span text-primary>
            {{ process.company?.name }}
          </span>
        </h1>

        <div>
          <div>Confirme as informações a serem compartilhadas com a empresa:</div>
          <div><b>Apresentação:</b> {{ profile.presentation }}</div>
          <div><b>Tags:</b> {{ tags }}</div>
          <div flex gap-1>
            <b>CV:</b>
            <span v-if="profile.cv" mb-5>
              <nuxt-link :href="profile.cv" target="_blank" flex items-center gap-1 hover:underline>
                <div class="i-ph-file-pdf" />
                Seu CV Atual
              </nuxt-link>
            </span>
            <span v-else>
              Nenhum CV enviado ainda.
            </span>
          </div>
          <div>
            Caso necessite atualize seu perfil
            <nuxt-link to="/meu-perfil">
              aqui
            </nuxt-link>
            . Você também pode fazê-lo após aplicar para vaga, o recrutador sempre verá seu perfil mais atualizado.
          </div>
        </div>

        <div>
          <b>Atenção</b>
          <ol>
            <li>1. A partir deste momento a empresa poderá entrar em contato com você por por outros meios que não a plataforma, como e-mail, telefone ou whatsapp.</li>
            <li>2. O processo de recrutamento seguirá modelo próprio da empresa podendo conter entrevistas e testes de habilidades.</li>
            <li>3. Desejamos sorte na sua candidatura e muito sucesso na sua carreira!</li>
          </ol>
        </div>

        <q-btn
          color="primary"
          no-caps w-full
          @click="onApply"
        >
          Confirmar Candidatura
        </q-btn>
      </div>
    </div>
  </q-page>
</template>
