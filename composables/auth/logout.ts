export async function authLogout() {
  await $fetch('/api/auth/logout', {
    method: 'POST',
  })
  await useAuth().updateSession()
  await navigateTo('/auth/login')
}
