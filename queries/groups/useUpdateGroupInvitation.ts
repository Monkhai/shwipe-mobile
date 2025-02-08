import functions from '@react-native-firebase/functions'
import { GroupInvitationStatus, UPDATE_GROUP_INVITATION_CFN } from './groupTypes'
import { useMutation } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { queryClient } from '@/providers/QueryProvider'
import { router } from 'expo-router'

type UpdateGroupInvitationRequest = {
  groupId: string
  status: GroupInvitationStatus
}

const fn = functions().httpsCallable<UpdateGroupInvitationRequest>(UPDATE_GROUP_INVITATION_CFN)

export const useUpdateGroupInvitation = () => {
  return useMutation({
    mutationFn: fn,
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.groupInvitations })
      queryClient.invalidateQueries({ queryKey: () => queryKeystore.groupInvitation(request!.groupId) })
      queryClient.invalidateQueries({ queryKey: queryKeystore.groups })
      if (request!.status === GroupInvitationStatus.ACCEPTED) {
        router.dismissTo(`/(auth)/groups`)
      } else {
        router.dismissTo('/(auth)/home')
      }
    },
  })
}
