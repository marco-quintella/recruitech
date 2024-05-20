import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const { public: { firebase } } = useRuntimeConfig()

    const app = initializeApp(firebase)
    const analytics = getAnalytics(app)

    return {
      provide: {
        firebase: {
          analytics,
          app,
        },
      },
    }
  }
})
