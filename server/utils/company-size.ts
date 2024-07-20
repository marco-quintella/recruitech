import { companySize } from '@prisma/client'
import { z } from 'zod'

export const companySizeSchema = z.enum(Object.values(companySize) as [string])
