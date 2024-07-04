import { asc, count, desc, eq } from 'drizzle-orm'

export async function getApplications({ filters, pagination }: {
  filters?: Partial<Application>
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
}) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const query = db.select()
    .from(applications)
    .$dynamic()
  const total = db.select({ count: count() }).from(applications).$dynamic()

  if (filters?.processId) {
    query.where(eq(applications.processId, filters.processId))
    total.where(eq(applications.processId, filters.processId))
  }
  if (filters?.profileId) {
    query.where(eq(applications.profileId, filters?.profileId))
    total.where(eq(applications.profileId, filters?.profileId))
  }

  query.orderBy(
    direction === 'asc'
      ? asc(applications[orderBy])
      : desc(applications[orderBy]),
  )
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const execute = await Promise.all([query, total])

  return {
    data: execute[0],
    meta: {
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
        total: execute[1][0].count,
        totalPages: Math.ceil(execute[1][0].count / pageSize),
      },
    },
  }
}
