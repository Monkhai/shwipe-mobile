import functions from '@react-native-firebase/functions'
import { useMutation } from '@tanstack/react-query'

type SendSessionInvitationRequest = {
  sessionId: string
  userId: string
}

const fn = functions().httpsCallable<SendSessionInvitationRequest, void>('sendSessionInvitation')

const sendSessionInvitation = async (request: SendSessionInvitationRequest) => {
  await fn(request)
}

export function useSendSessionInvitation() {
  return useMutation({
    mutationFn: sendSessionInvitation,
  })
}
