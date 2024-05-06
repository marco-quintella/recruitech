import { asc, count, desc, eq } from 'drizzle-orm'

export async function getProcesses(
  filters?: Partial<Process>,
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  },
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const query = db.select({
    cancelledAt: processes.cancelledAt,
    company: {
      id: companies.id,
      logo: companies.logo,
      name: companies.name,
    },
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
    tags: {
      name: tags.name,
    },
    title: processes.title,
    updatedAt: processes.updatedAt,
  })
    .from(processes)
    .leftJoin(companies, eq(processes.companyId, companies.id))
    .leftJoin(processesToTags, eq(processesToTags.processId, processes.id))
    .leftJoin(tags, eq(tags.id, processesToTags.tagId))
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
