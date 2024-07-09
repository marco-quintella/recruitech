export async function getProcessById(processId: string) {
  return await prisma.processes.findFirst({
    include: {
      company: true,
    },
    where: {
      id: processId,
    },
  })
}
