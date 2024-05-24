import { pgEnum } from 'drizzle-orm/pg-core'

export const remoteTypeEnum = pgEnum('remote_type', [
  'full_remote',
  'hybrid',
  'on_site',
])

export type RemoteType = typeof remoteTypeEnum.enumValues[number]

export const RemoteTypeEnum = remoteTypeEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<RemoteType, RemoteType>
