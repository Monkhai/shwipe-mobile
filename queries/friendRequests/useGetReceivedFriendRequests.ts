import functions from '@react-native-firebase/functions'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { FriendRequest, GET_RECEIVED_FRIEND_REQUESTS_CFN } from './friendRequestsTypes'

const fn = functions().httpsCallable<null, Array<FriendRequest>>(GET_RECEIVED_FRIEND_REQUESTS_CFN)

async function getReceivedFriendRequests() {
  const res = await fn()
  return res.data
}

export function useGetReceivedFriendRequests() {
  return useQuery({
    queryKey: queryKeystore.receivedFriendRequests,
    queryFn: getReceivedFriendRequests,
  })
}
