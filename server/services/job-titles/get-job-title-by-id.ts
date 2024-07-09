export async function getJobTitleById(id: string) {
  return await prisma.jobTitles.findFirst({
    where: {
      id,
    },
  })
}
