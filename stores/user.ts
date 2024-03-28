import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const { session } = useAuth()

  const user = computed(() => session.value?.data)

  return { user }
})
