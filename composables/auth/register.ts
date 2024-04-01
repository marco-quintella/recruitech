import type { Role } from '~/db/role'

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
