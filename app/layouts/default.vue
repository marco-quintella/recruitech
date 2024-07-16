<script lang="ts" setup>
const showDrawer = ref(false)

function toggleDrawer() {
  showDrawer.value = !showDrawer.value
}
</script>

<template>
  <q-layout view="hHh Lpr lff" h-full flex flex-col>
    <LayoutToolbar @toggle-drawer="toggleDrawer" />
    <layout-drawer v-model="showDrawer" />
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
