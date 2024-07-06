import { ilike } from 'drizzle-orm'

export type GetTagsResponse = Awaited<ReturnType<typeof getTags>>

export async function getTags({ search }: { search?: string }) {
  const query = db.select({
    id: tags.id,
    name: tags.name,
  }).from(tags)

  if (search)
    query.where(ilike(tags.name, `%${search}%`))

  query.orderBy(tags.name)

  return await query
}
