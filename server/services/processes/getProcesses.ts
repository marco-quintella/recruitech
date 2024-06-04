import { asc, count, desc, eq, ilike, inArray } from 'drizzle-orm'
import type { ContractType } from '../../../db/contract-type'
import type { ExperienceLevel } from '../../../db/experience-level'

export async function getProcesses({
  contractTypes,
  experienceLevels,
  filters,
  locationId,
  pagination,
  remoteTypes,
  search,
  tagIds,
}: {
  filters?: Partial<Process>
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
  search?: string
  locationId?: string
  tagIds?: string[]
  contractTypes?: ContractType[]
  experienceLevels?: ExperienceLevel[]
  remoteTypes?: RemoteType[]
},
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const processesQuery = db.select({
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
    remote: processes.remote,
    salary_0: processes.salary_0,
    salary_1: processes.salary_1,
    title: processes.title,
    updatedAt: processes.updatedAt,
  })
    .from(processes)
    .leftJoin(companies, eq(processes.companyId, companies.id))

  if (locationId?.length) {
    const locationQuery = await db.select({
      processId: processesToLocations.processId,
    })
      .from(processesToLocations)
      .where(eq(processesToLocations.locationId, locationId))

    if (locationQuery?.length) {
      processesQuery.where(
        inArray(processes.id, locationQuery.map(({ processId }) => processId)),
      )
    }
  }

  if (tagIds?.length) {
    const tagsQuery = await db.select({
      processId: processesToTags.processId,
    })
      .from(processesToTags)
      .where(inArray(processesToTags.tagId, tagIds))

    if (tagsQuery?.length) {
      processesQuery.where(
        inArray(processes.id, tagsQuery.map(({ processId }) => processId)),
      )
    }
  }

  if (contractTypes?.length) {
    processesQuery.where(
      inArray(processes.contractType, contractTypes),
    )
  }

  if (experienceLevels?.length) {
    processesQuery.where(
      inArray(processes.experienceLevel, experienceLevels),
    )
  }

  if (remoteTypes?.length) {
    processesQuery.where(
      inArray(processes.remote, remoteTypes),
    )
  }

  processesQuery.orderBy(direction === 'asc' ? asc(processes[orderBy]) : desc(processes[orderBy]))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const total = db.select({ count: count() })
    .from(processes)
    .leftJoin(companies, eq(processes.companyId, companies.id))

  if (filters) {
    // O(2n) Filter
    const filterEntries = Object.entries(filters).filter(([, value]) => value !== undefined)
    for (const [key, value] of filterEntries) {
      if (key in processes) {
        // @ts-expect-error generic typing inference
        processesQuery.where(eq(processes[key], value))
        // @ts-expect-error generic typing inference
        total.where(eq(processes[key], value))
      }
    }
  }

  if (!!search && search.length > 3) {
    // Title Search
    processesQuery.where(ilike(processes.title, `%${search}%`))
    total.where(ilike(processes.title, `%${search}%`))

    // Company Search
    processesQuery.where(ilike(companies.name, `%${search}%`))
    total.where(ilike(companies.name, `%${search}%`))
  }

  const processesData = await processesQuery
  const processesIds = processesData.map(({ id }) => id)

  if (!processesData || processesData.length === 0) {
    return {
      data: [],
      meta: {
        pagination: {
          direction,
          orderBy,
          page,
          pageSize,
          total: 0,
          totalPages: 0,
        },
      },
    }
  }

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

  // Location
  const locationData = await db.select({
    city: locations.city,
    country: locations.country,
    processId: processesToLocations.processId,
    state: locations.state,
  }).from(processesToLocations)
    .leftJoin(locations, eq(processesToLocations.locationId, locations.id))
    .where(inArray(processesToLocations.processId, processesIds))

  // O(n) Reduce
  const aggregatedLocations = locationData.reduce((acc, location) => {
    if (location.city && location.state && location.country)
      acc[location.processId] = { city: location.city, country: location.country, state: location.state }
    return acc
  }, {} as Record<string, { city: string, country: string, state: string }>)

  // O(n) Map
  const returnData = processesData.map(proccess => ({
    ...proccess,
    jobTitles: aggregatedJobTitles[proccess.id] ?? [],
    location: aggregatedLocations[proccess.id],
    tags: aggregatedTags?.[proccess.id] ?? [],
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
