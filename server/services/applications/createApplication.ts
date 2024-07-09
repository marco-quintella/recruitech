export async function createApplication({
  processId,
  profileId,
}: {
  processId: string
  profileId: string
}) {
  return await prisma.applications.create({
    data: {
      processId,
      profileId,
    },
  })
}
