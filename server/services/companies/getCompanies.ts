import { and, asc, count, desc, eq, ilike, isNull, sql } from 'drizzle-orm'

export async function getCompanies({
  filters,
  pagination,
  search,
}: {
  filters?: Partial<Company>
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
  search?: string
} = {}) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const companiesQuery = db.select({
    companySize: companies.companySize,
    facebook: companies.facebook,
    id: companies.id,
    instagram: companies.instagram,
    linkedin: companies.linkedin,
    location: {
      city: locations.city,
      country: locations.country,
      state: locations.state,
    },
    logo: companies.logo,
    name: companies.name,
    openings: sql`count('*') - 1`.mapWith(Number),
    twitter: companies.twitter,
    website: companies.website,
  })
    .from(companies).$dynamic()
    .innerJoin(
      processes,
      and(
        eq(processes.companyId, companies.id),
        and(
          isNull(processes.finishedAt),
          isNull(processes.cancelledAt),
        ),
      ),
    )
    .innerJoin(locations, eq(companies.hqLocation, locations.id))
    .groupBy(companies.id, locations.country, locations.state, locations.city)

  const total = db.select({ count: count() })
    .from(companies)

  if (filters) {
    if (filters.id) {
      companiesQuery.where(eq(companies.id, filters.id))
      total.where(eq(companies.id, filters.id))
    }
  }

  if (!!search && search.length > 3) {
    companiesQuery.where(ilike(companies.name, `%${search}%`))
    total.where(ilike(companies.name, `%${search}%`))
  }

  companiesQuery.orderBy(
    direction === 'asc'
      ? asc(companies[orderBy])
      : desc(companies[orderBy]),
  )
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const execute = await Promise.all([companiesQuery, total])

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
