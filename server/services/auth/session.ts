import consola from 'consola'
import type { H3Event, SessionConfig } from 'h3'
import crypto from 'uncrypto'

const sessionConfig: SessionConfig = useRuntimeConfig().auth || {}

export interface AuthSession {
  id: string
  name: string
  email: string
  role: Role
  confirmedEmail: boolean
  companyId: string | null
}

export async function useAuthSession(event: H3Event) {
  const session = await useSession<AuthSession>(event, sessionConfig)

  if (session.data.id) {
    const user = await prisma.users.findFirst({
      select: {
        companyId: true,
        confirmedEmail: true,
        email: true,
        id: true,
        name: true,
        role: true,
      },
      where: {
        id: session.data.id,
      },
    })

    if (user)
      session.update(user)
  }

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

  if (!session.data.email || !session.data.id) {
    throw createError({
      message: 'Não autorizado',
      statusCode: 401,
    })
  }

  return session
}
