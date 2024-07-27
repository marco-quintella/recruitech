import type { RoleEnum } from '../../../server/utils/enums'

export async function authRegister(body: {
  email: string
  password: string
  name: string
  role: RoleEnum
  companyName?: string
}) {
  await $fetch('/api/auth/register', {
    body,
    method: 'POST',
  })
  await navigateTo('/auth/pos-registro')
}
