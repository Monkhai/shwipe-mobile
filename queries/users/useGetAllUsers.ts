import functions from '@react-native-firebase/functions'
import { User, GET_ALL_USERS_CFN } from './userTypes'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

type GetAllUsersResponse = Array<User>

const fn = functions().httpsCallable<null, GetAllUsersResponse>(GET_ALL_USERS_CFN)

async function getAllUsers(): Promise<GetAllUsersResponse> {
  const res = await fn()
  return res.data
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: queryKeystore.users,
    queryFn: getAllUsers,
  })
}
