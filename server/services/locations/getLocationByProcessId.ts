export async function getLocationByProcessId(processId: string) {
  return await prisma.locations.findFirst({
    where: {
      processes: {
        some: {
          id: processId,
        },
      },
    },
  })
}
