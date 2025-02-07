import functions from '@react-native-firebase/functions'
import { GET_GROUP_INVITATIONS_CFN, GroupInvitation } from './groupTypes'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

type GetGroupInvitationsResonponse = {
  groupInvitations: Array<GroupInvitation>
}

const fn = functions().httpsCallable<void, GetGroupInvitationsResonponse>(GET_GROUP_INVITATIONS_CFN)

async function getGroupInvitations() {
  const response = await fn()
  return response.data.groupInvitations
}

export function useGetGroupInvitations() {
  return useQuery({ queryKey: queryKeystore.groupInvitations, queryFn: getGroupInvitations })
}
