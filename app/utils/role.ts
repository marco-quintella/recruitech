import { z } from 'zod'
import { RoleEnum } from '../../server/utils/enums'

export const roleOptions: { label: string, value: RoleEnum }[] = [
  {
    label: 'Candidato',
    value: RoleEnum.candidate,
  },
  {
    label: 'Administrador de Empresa',
    value: RoleEnum.company_admin,
  },
  {
    label: 'Recrutador',
    value: RoleEnum.recruiter,
  },
  {
    label: 'Sistema',
    value: RoleEnum.system,
  },
]

export const roleSchema = z.enum(Object.values(RoleEnum) as [string])
