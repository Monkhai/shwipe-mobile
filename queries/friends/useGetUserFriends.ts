import functions from '@react-native-firebase/functions'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { Friend, GET_FRIENDS_CFN } from './friendsTypes'

type GetUserFriendshipsResponse = Array<Friend>

const fn = functions().httpsCallable<null, GetUserFriendshipsResponse>(GET_FRIENDS_CFN)

async function getUserFriends() {
  const res = await fn()
  return res.data
}

export function useGetUserFriends() {
  return useQuery({
    queryKey: queryKeystore.friends,
    queryFn: getUserFriends,
  })
}
