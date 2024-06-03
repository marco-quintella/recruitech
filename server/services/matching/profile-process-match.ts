import consola from 'consola'
import { getProcessesByTags } from '../processes/getProcessesByTags'

export async function matchProfileToProcess(userId: string) {
  const profile = await getProfileByUserId(userId)

  if (!profile)
    throw new Error('Profile not found')

  // Matching logic here
  consola.log('Matching profile to service')
  consola.log('Profile matched:', profile.id)

  consola.log('Matching by Tags')

  if (!profile.tags || profile.tags.length === 0)
    throw new Error('No tags to match')

  const tagIds = profile.tags.map(tag => tag.id).filter(isDefined)

  if (tagIds.length === 0)
    throw new Error('No tag ids to match')

  const processesToTags = await getProcessesByTags(tagIds)

  if (!processesToTags)
    return []

  const p = Object.entries(processesToTags)
    .sort(([_keyA, valueA], [_keyB, valueB]) => valueB.length - valueA.length)
    .slice(0, 5)
    .map(([process, _]) => getProcesses({ filters: { id: process } }))
  const results = await Promise.all(p)

  return results.map(r => r.data[0]).filter(isDefined)
}
