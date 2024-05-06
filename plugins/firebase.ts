import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const { public: { firebase } } = useRuntimeConfig()

    const app = initializeApp(firebase)
    const analytics = getAnalytics(app)

    return {
      provide: {
        firebase: {
          app,
          analytics,
        },
      },
    }
  }
})
