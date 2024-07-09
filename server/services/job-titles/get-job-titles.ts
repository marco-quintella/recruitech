export async function getJobTitles() {
  return await prisma.jobTitles.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}
