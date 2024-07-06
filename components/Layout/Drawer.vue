<script lang="ts" setup>
const model = defineModel({ default: false })
</script>

<template>
  <q-drawer v-model="model" overlay size="left">
    <q-scroll-area class="fit">
      <q-list>
        <q-item v-ripple clickable to="/vagas">
          <q-item-section>
            Vagas
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style>

</style>
