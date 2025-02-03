import functions from '@react-native-firebase/functions'
import { FriendRequestsStatus, UPDATE_FRIEND_REQUEST_STATUS_CFN } from './friendRequestsTypes'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/QueryProvider'
import { queryKeystore } from '../queryKeystore'

type UpdateFriendRequestRequest = {
  friendRequestId: string
  status: FriendRequestsStatus
}

const fn = functions().httpsCallable<UpdateFriendRequestRequest, void>(UPDATE_FRIEND_REQUEST_STATUS_CFN)

export function useUpdateFriendRequest() {
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests })
      queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests })
    },
  })
}
