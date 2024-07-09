export async function getUserByCompanyId(companyId: string, opts?: {
  page?: number
  pageSize?: number
  orderBy?: 'name' | 'email' | 'role'
  direction?: 'asc' | 'desc'
}) {
  const { direction = 'asc', orderBy = 'name', page = 1, pageSize = 10 } = opts || {}

  const [total, users] = await prisma.$transaction([
    prisma.users.count({
      where: {
        companyId,
      },
    }),
    prisma.users.findMany({
      orderBy: {
        [orderBy]: direction,
      },
      select: {
        companyId: true,
        email: true,
        id: true,
        name: true,
        role: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        companyId,
      },
    }),
  ])

  return {
    data: users,
    meta: {
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
  }
}
