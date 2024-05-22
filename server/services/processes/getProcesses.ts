import { asc, count, desc, eq, inArray } from 'drizzle-orm'

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
    title: processes.title,
    updatedAt: processes.updatedAt,
  })
    .from(processes)
    .leftJoin(companies, eq(processes.companyId, companies.id))
    .orderBy(direction === 'asc' ? asc(processes[orderBy]) : desc(processes[orderBy]))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const total = db.select({ count: count() })
    .from(processes)

  if (filters) {
    // O(2n) Filter
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

  const processesData = await query
  const processesIds = processesData.map(({ id }) => id)

  // Get Tags
  // O(n) Map
  const tagsData = await db.select({
    id: tags.id,
    name: tags.name,
    processId: processesToTags.processId,
  }).from(processesToTags)
    .leftJoin(tags, eq(processesToTags.tagId, tags.id))
    .where(inArray(processesToTags.processId, processesIds))

  // O(n) Reduce
  const aggregatedTags = tagsData.reduce((acc, tag) => {
    if (!acc[tag.processId])
      acc[tag.processId] = []
    if (tag.id && tag.name)
      acc[tag.processId].push({ id: tag.id, name: tag.name })
    return acc
  }, {} as Record<string, { name: string, id: string }[]>)

  // O(n) Get Job Titles
  const jobTitlesData = await db.select({
    id: jobTitles.id,
    name: jobTitles.name,
    processId: processesToJobTitles.processId,
  }).from(processesToJobTitles)
    .leftJoin(jobTitles, eq(processesToJobTitles.jobTitleId, jobTitles.id))
    .where(inArray(processesToJobTitles.processId, processesIds))

  // O(n) Reduce
  const aggregatedJobTitles = jobTitlesData.reduce((acc, jobTitle) => {
    if (!acc[jobTitle.processId])
      acc[jobTitle.processId] = []
    if (jobTitle.id && jobTitle.name)
      acc[jobTitle.processId].push({ id: jobTitle.id, name: jobTitle.name })
    return acc
  }, {} as Record<string, { name: string, id: string }[]>)

  // O(n) Map
  const returnData = processesData.map(proccess => ({
    ...proccess,
    jobTitles: aggregatedJobTitles[proccess.id] ?? [],
    tags: aggregatedTags[proccess.id] ?? [],
  }))

  // Total
  const totalData = await total

  // O(3n) return
  return {
    data: returnData,
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
