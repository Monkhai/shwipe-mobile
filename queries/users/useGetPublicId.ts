import functions from '@react-native-firebase/functions'
import { useQuery } from '@tanstack/react-query'
import { GET_PUBLIC_ID_CFN } from './userTypes'
import { queryKeystore } from '../queryKeystore'

const fn = functions().httpsCallable<null, string>(GET_PUBLIC_ID_CFN)

async function getPublicId() {
  const res = await fn()
  return res.data
}

export function useGetPublicId() {
  return useQuery({
    queryKey: queryKeystore.publicId,
    queryFn: getPublicId,
  })
}
