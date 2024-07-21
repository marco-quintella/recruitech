import type { role as Role } from '@prisma/client'

export async function authRegister(body: {
  email: string
  password: string
  name: string
  role: Role
  companyName?: string
}) {
  await $fetch('/api/auth/register', {
    body,
    method: 'POST',
  })
  await navigateTo('/auth/pos-registro')
}
