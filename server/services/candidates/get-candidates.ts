import { count } from 'drizzle-orm'

export async function getCandidates({
  pagination,
  search,
}: {
  search?: string
  pagination?: {
    page?: number
    pageSize?: number
  }
}) {
  const { page = 1, pageSize = 10 } = pagination ?? {}

  const query = await db.query.profiles.findMany({
    limit: pageSize,
    offset: page - 1,
    with: {
      location: true,
      profilesToJobTitles: {
        with: {
          jobTitle: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      profilesToTags: {
        with: {
          tag: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  })

  const mapped = query.map(profile => ({
    ...profile,
    jobTitles: profile.profilesToJobTitles.map(p => p.jobTitle),
    locationId: undefined,
    profilesToJobTitles: undefined,
    profilesToTags: undefined,
    tags: profile.profilesToTags.map(p => p.tag),
    userId: undefined,
  }))

  const total = await db.select({ count: count() }).from(profiles)

  return {
    data: mapped,
    meta: {
      pagination: {
        page,
        pageSize,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / pageSize),
      },
    },
  }
}
