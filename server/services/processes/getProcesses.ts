import { asc, count, desc, eq } from 'drizzle-orm'

export async function getProcesses(
  filters: {
    companyId?: string
  },
  pagination: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt'
    page: number
    pageSize: number
  },
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination
  const { companyId } = filters

  const query = db.select({
    cancelledAt: processes.cancelledAt,
    companyId: processes.companyId,
    contractType: processes.contractType,
    createdAt: processes.createdAt,
    description: processes.description,
    email: processes.email,
    experienceLevel: processes.experienceLevel,
    finishedAt: processes.finishedAt,
    id: processes.id,
    link: processes.link,
    processType: processes.processType,
    salary_0: processes.salary_0,
    salary_1: processes.salary_1,
    title: processes.title,
    updatedAt: processes.updatedAt,
  })
    .from(processes)
    .orderBy(direction === 'asc' ? asc(processes[orderBy]) : desc(processes[orderBy]))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const total = db.select({ count: count() })
    .from(processes)

  if (companyId) {
    query.where(eq(processes.companyId, companyId))
    total.where(eq(processes.companyId, companyId))
  }

  const data = await query
  const totalData = await total

  return {
    data,
    meta: {
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
        total: totalData[0].count,
        totalPages: Math.ceil(totalData[0].count / pageSize),
      },
    },
  }
}
