import functions from '@react-native-firebase/functions'
import { queryKeystore } from '../queryKeystore'
import { SEND_FRIEND_REQUEST_CFN } from './friendRequestsTypes'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/QueryProvider'

type SendFriendRequestRequest = {
  userId: string
}

const fn = functions().httpsCallable<SendFriendRequestRequest, void>(SEND_FRIEND_REQUEST_CFN)

export function useSendFriendRequest() {
  return useMutation({
    mutationFn: (request: SendFriendRequestRequest) => fn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests })
      queryClient.invalidateQueries({ queryKey: queryKeystore.friends })
    },
  })
}
