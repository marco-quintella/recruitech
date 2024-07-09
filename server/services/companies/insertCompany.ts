import type { Prisma } from '@prisma/client'

export async function insertCompany(data: Prisma.companiesCreateInput) {
  return await prisma.companies.create({ data })
}
