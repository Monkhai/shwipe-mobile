import functions from '@react-native-firebase/functions'
import { useMutation } from '@tanstack/react-query'
import { SEND_GROUP_INVITATION_CFN } from './groupTypes'

type SendGroupInvitationRequest = {
  groupId: string
  userId: string
}

const fn = functions().httpsCallable<SendGroupInvitationRequest, void>(SEND_GROUP_INVITATION_CFN)

const sendGroupInvitation = async (request: SendGroupInvitationRequest) => {
  await fn(request)
}

export function useSendGroupInvitation() {
  return useMutation({
    mutationFn: sendGroupInvitation,
  })
}
