import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const { session } = useAuth()

  const user = computed(() => session.value?.data)

  return { user }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
