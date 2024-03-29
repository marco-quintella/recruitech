import type { H3Event, SessionConfig } from 'h3'
import crypto from 'uncrypto'

const sessionConfig: SessionConfig = useRuntimeConfig().auth || {}

export interface AuthSession {
  id: string
  name: string
  email: string
}

export async function useAuthSession(event: H3Event) {
  const session = await useSession<AuthSession>(event, sessionConfig)
  return session
}

export async function hash(str: string) {
  const msgUint8 = new TextEncoder().encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
}

export async function requireAuthSession(event: H3Event) {
  const session = await useAuthSession(event)

  if (!session.data.email) {
    throw createError({
      message: 'Não autorizado',
      statusCode: 401,
    })
  }

  return session
}
