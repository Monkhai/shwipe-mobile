import functions from '@react-native-firebase/functions'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { Friend, GET_FRIENDS_CFN } from './friendsTypes'

const fn = functions().httpsCallable<null, Array<Friend>>(GET_FRIENDS_CFN)

async function getUserFriends() {
  const res = await fn()
  return res.data
}

export function useGetUserFriends() {
  console.log('trying to get friends')
  return useQuery({
    queryKey: queryKeystore.friends,
    queryFn: getUserFriends,
  })
}
