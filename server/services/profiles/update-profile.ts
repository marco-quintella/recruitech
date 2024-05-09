import { eq } from 'drizzle-orm'

interface UpdateProfileData {
  presentation?: string
  userId: string
  tags?: string[]
}

export async function updateProfile({
  presentation,
  tags,
  userId,
}: UpdateProfileData) {
  const profileQuery = await db.update(profiles)
    .set({
      presentation,
    })
    .where(eq(profiles.userId, userId))
    .returning()

  if (tags?.length && profileQuery?.[0]?.id) {
    const tagsPromises = tags.map(tagId => getTagById(tagId))
    const tagsData = await Promise.all(tagsPromises)
    const validTags = tagsData.filter(isDefined).map(tag => tag.id)

    await db.insert(profilesToTags)
      .values(validTags.map(tagId => ({
        profileId: profileQuery[0].id,
        tagId,
      })))
      .onConflictDoNothing()
  }

  return profileQuery?.[0]
}
