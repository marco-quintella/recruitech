import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

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

export const remoteTypeOptions: { value: RemoteType, label: string }[] = [
  {
    label: 'Remoto',
    value: 'full_remote',
  },
  {
    label: 'Híbrido',
    value: 'hybrid',
  },
  {
    label: 'Local',
    value: 'on_site',
  },
]

export const remoteTypeSchema = z.enum(remoteTypeEnum.enumValues)
