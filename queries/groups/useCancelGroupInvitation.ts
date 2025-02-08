import functions from '@react-native-firebase/functions'
import { CANCEL_GROUP_INVITATION_CFN } from './groupTypes'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/QueryProvider'
import { queryKeystore } from '../queryKeystore'

type CancelGroupInvitationRequest = {
  groupId: string
  userId: string
}

const fn = functions().httpsCallable<CancelGroupInvitationRequest, void>(CANCEL_GROUP_INVITATION_CFN)

async function cancelGroupInvitation(request: CancelGroupInvitationRequest) {
  await fn(request)
}

export function useCancelGroupInvitation() {
  return useMutation({
    mutationFn: cancelGroupInvitation,
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.groups })
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: queryKeystore.group(request.groupId) })
      }, 1000)
    },
    onError: error => {
      console.error(error)
    },
  })
}
