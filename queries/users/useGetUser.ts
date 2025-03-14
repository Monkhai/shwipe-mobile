import functions from '@react-native-firebase/functions'
import { GET_USER_CFN, User } from './userTypes'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

type GetUserRequest = {
  publicId: string
}

type GetUserResponse = {
  user: User & { isFriend: boolean }
}

const fn = functions().httpsCallable<GetUserRequest, GetUserResponse>(GET_USER_CFN)

async function getUser(publicId: string) {
  const response = await fn({ publicId })
  return response.data.user
}

export function useGetUser(publicId: string) {
  return useQuery({
    queryKey: queryKeystore.user(publicId),
    queryFn: () => getUser(publicId),
  })
}
