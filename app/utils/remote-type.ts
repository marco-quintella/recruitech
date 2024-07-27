import { z } from 'zod'
import { RemoteTypeEnum } from '../../server/utils/enums'

export const remoteTypeOptions: { value: RemoteTypeEnum, label: string }[] = [
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

export const remoteTypeSchema = z.enum(Object.values(RemoteTypeEnum) as [string])
