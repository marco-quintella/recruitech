export async function getCandidates({
  pagination,
}: {
  search?: string
  pagination?: {
    page?: number
    pageSize?: number
  }
}) {
  const { page = 1, pageSize = 10 } = pagination ?? {}

  const query = await prisma.$transaction([
    prisma.profiles.count(),
    prisma.profiles.findMany({
      select: {
        created_at: true,
        cv: true,
        id: true,
        location_id: false,
        locations: true,
        presentation: true,
        profiles_to_job_titles: {
          select: {
            job_titles: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        profiles_to_tags: {
          select: {
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        updated_at: true,
        user_id: false,
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  const [total, profiles] = query

  const mapped = profiles.map(profile => ({
    ...profile,
    jobTitles: profile.profiles_to_job_titles.map(p => p.job_titles),
    profiles_to_job_titles: undefined,
    profiles_to_tags: undefined,
    tags: profile.profiles_to_tags.map(p => p.tags),
    user: profile.users,
    users: undefined,
  }))

  return {
    data: mapped,
    meta: {
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
  }
}
