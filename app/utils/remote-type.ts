import { remoteType } from '@prisma/client'
import { z } from 'zod'

export const remoteTypeOptions: { value: remoteType, label: string }[] = [
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

export const remoteTypeSchema = z.enum(Object.values(remoteType) as [string])
