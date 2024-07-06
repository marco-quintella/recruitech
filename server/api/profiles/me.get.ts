export default defineEventHandler(async (event) => {
  const { data: session } = await requireAuthSession(event)
  return await getProfileByUserId(session.id)
})
