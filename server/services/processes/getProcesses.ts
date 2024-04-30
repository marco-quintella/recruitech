import { asc, count, desc, eq } from 'drizzle-orm'

export async function getProcesses(
  filters?: Partial<Process>,
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt'
    page: number
    pageSize: number
  },
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const query = db.select({
    cancelledAt: processes.cancelledAt ?? null,
    companyId: processes.companyId ?? null,
    contractType: processes.contractType ?? null,
    createdAt: processes.createdAt ?? null,
    description: processes.description ?? null,
    email: processes.email ?? null,
    experienceLevel: processes.experienceLevel ?? null,
    finishedAt: processes.finishedAt ?? null,
    id: processes.id ?? null,
    link: processes.link ?? null,
    processType: processes.processType ?? null,
    salary_0: processes.salary_0 ?? null,
    salary_1: processes.salary_1 ?? null,
    title: processes.title ?? null,
    updatedAt: processes.updatedAt ?? null,
  })
    .from(processes)
    .orderBy(direction === 'asc' ? asc(processes[orderBy]) : desc(processes[orderBy]))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const total = db.select({ count: count() })
    .from(processes)

  if (filters) {
    const filterEntries = Object.entries(filters).filter(([, value]) => value !== undefined)
    for (const [key, value] of filterEntries) {
      if (key in processes) {
        // @ts-expect-error generic typing inference
        query.where(eq(processes[key], value))
        // @ts-expect-error generic typing inference
        total.where(eq(processes[key], value))
      }
    }
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
