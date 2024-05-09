interface CreateProfileData {
  userId: string
  tags?: string[]
  presentation?: string
}

export async function createProfile({ presentation, tags, userId }: CreateProfileData) {
  const profileQuery = await db.insert(profiles)
    .values({
      presentation,
      userId,
    })
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
