import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const runtimeConfig = useRuntimeConfig()
const firebaseConfig = runtimeConfig.public.firebase

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export const firebase = {
  app,
  storage,
}
