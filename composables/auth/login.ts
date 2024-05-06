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
