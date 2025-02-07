import functions from '@react-native-firebase/functions'
import { GET_GROUPS_CFN, Group } from './groupTypes'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

type GetUserGroupsResponse = {
  groups: Array<Group>
}

const fn = functions().httpsCallable<null, GetUserGroupsResponse>(GET_GROUPS_CFN)

async function getUserGroups() {
  const response = await fn()
  return response.data.groups
}

export function useGetGroups() {
  return useQuery({
    queryKey: queryKeystore.groups,
    queryFn: getUserGroups,
  })
}
