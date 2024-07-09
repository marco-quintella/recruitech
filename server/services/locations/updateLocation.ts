export async function updateLocation(location: {
  id: string
  city?: string
  state?: string
}) {
  return await prisma.locations.update({
    data: {
      city: location.city,
      state: location.state,
    },
    where: { id: location.id },
  })
}
