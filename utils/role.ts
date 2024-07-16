import { role } from '@prisma/client'
import { z } from 'zod'

export const roleOptions: { label: string, value: role }[] = [
  {
    label: 'Candidato',
    value: role.candidate,
  },
  {
    label: 'Administrador de Empresa',
    value: role.company_admin,
  },
  {
    label: 'Recrutador',
    value: role.recruiter,
  },
  {
    label: 'Sistema',
    value: role.system,
  },
]

export const roleSchema = z.enum(Object.values(role) as [string])
