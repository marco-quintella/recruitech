export async function getJobTitlesByName(name: string) {
  return await prisma.jobTitles.findMany({
    where: {
      name: {
        contains: `%${name}%`,
      },
    },
  })
}
