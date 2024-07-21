export default defineSitemapEventHandler(async () => {
  const fixed = [
    {
      lastmod: new Date(),
      loc: '/',
    },
    {
      lastmod: new Date(),
      loc: '/empresas',
    },
    {
      lastmod: new Date(),
      loc: '/vagas',
    },
  ]

  const query = await prisma.$transaction([
    prisma.companies.findMany({
      select: {
        id: true,
      },
    }),
    prisma.processes.findMany({
      select: {
        id: true,
      },
      where: {
        AND: {
          cancelledAt: null,
          finishedAt: null,
        },
      },
    }),
  ])

  return [
    ...fixed,
    ...query[0].map(company => ({
      lastmod: new Date(),
      loc: `/empresas/${company.id}`,
    })),
    ...query[1].map(process => ({
      lastmod: new Date(),
      loc: `/vagas/${process.id}`,
    })),
  ]
})
