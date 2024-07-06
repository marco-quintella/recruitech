import { eq } from 'drizzle-orm'

export async function getProfileByUserId(userId: string) {
  const profileQuery = await db.select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1)

  if (!profileQuery?.[0]?.id)
    return

  const profileTagsQuery = await db.select({
    id: tags.id,
    name: tags.name,
  })
    .from(profilesToTags)
    .leftJoin(tags, eq(profilesToTags.tagId, tags.id))
    .where(eq(profilesToTags.profileId, profileQuery[0]?.id))

  return {
    ...profileQuery?.[0],
    tags: profileTagsQuery.map(tag => ({
      id: tag.id,
      name: tag.name,
    })),
  }
}
