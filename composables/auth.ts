import type { Role } from '../db/role'

export const useAuth = () => useNuxtApp().$auth

export async function authLogin(email: string, password: string) {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })
  useAuth().redirectTo.value = null
  await useAuth().updateSession()
  await navigateTo(useAuth().redirectTo.value || '/')
}

export async function authRegister(body: {
  email: string
  password: string
  name: string
  role: Role
  companyName?: string
}) {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body,
  })
  await navigateTo('/auth/pos-registro')
}

export async function authLogout() {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  })
  await useAuth().updateSession()
  await navigateTo('/auth/login')
}
