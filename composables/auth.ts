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

export async function authRegister(body: { email: string, password: string, name: string, role: Role }) {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body,
  })
  return await authLogin(body.email, body.password)
}

export async function authLogout() {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  })
  await useAuth().updateSession()
}
