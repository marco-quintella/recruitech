export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error)
    return {}

  const { data: session, refresh: updateSession }
   = await useFetch('/api/auth/session')

  const loggedIn = computed(() => !!session.value?.data?.email)

  // Create a ref to know where to redirect the user when logged in
  const redirectTo = useState('authRedirect')

  /**
   * Add global route middleware to protect pages using:
   *
   * definePageMeta({
   *  auth: true
   * })
   */
  //

  addRouteMiddleware(
    'auth',
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        redirectTo.value = to.path
        return '/auth/login'
      }
    },
    { global: true },
  )

  const currentRoute = useRoute()

  // eslint-disable-next-line node/prefer-global/process
  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo('/login')
      }
    })
  }

  if (loggedIn.value && currentRoute.path === '/auth/login') {
    // Somehow the compiler needs this braces to compile
    // so to avoid eslint from removing them, KEEP THIS COMMENT!
    await navigateTo(redirectTo.value || '/')
  }

  return {
    provide: {
      auth: {
        loggedIn,
        session,
        redirectTo,
        updateSession,
      },
    },
  }
})
