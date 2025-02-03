import functions from '@react-native-firebase/functions'
import { FriendRequest, GET_SENT_FRIEND_REQUESTS_CFN } from './friendRequestsTypes'
import { queryKeystore } from '../queryKeystore'
import { useQuery } from '@tanstack/react-query'

const fn = functions().httpsCallable<null, Array<FriendRequest>>(GET_SENT_FRIEND_REQUESTS_CFN)

async function getSentFriendRequests() {
  const res = await fn()
  return res.data
}

export function useGetSentFriendRequests() {
  return useQuery({
    queryKey: queryKeystore.sentFriendRequests,
    queryFn: getSentFriendRequests,
  })
}
