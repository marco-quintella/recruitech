export default defineEventHandler(async (event) => {
  return await useAuthSession(event)
})
