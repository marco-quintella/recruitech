export async function authLogin(email: string, password: string) {
  await $fetch('/api/auth/login', {
    body: {
      email,
      password,
    },
    method: 'POST',
  })
  useAuth().redirectTo.value = null
  await useAuth().updateSession()
  await navigateTo(useAuth().redirectTo.value || '/')
}
