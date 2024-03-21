<template>
  <div>
    <LayoutToolbar />
    <main class="p-4">
      <slot />
    </main>
    <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Default Layout]
    </div>
  </div>
</template>
