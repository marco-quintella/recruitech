export default defineEventHandler(async () => {
  throw createError({ status: 404, statusMessage: 'Rota não encontrada.' })
})
