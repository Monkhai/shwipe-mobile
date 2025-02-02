import { userAtom } from '@/jotai/authAtom'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAtom } from 'jotai'
import { queryKeystore } from './queryKeystore'

async function getSessions(user: FirebaseAuthTypes.User | null) {
  try {
    if (!user) {
      return []
    }
    const tokenID = await user.getIdToken()
    const base = 'http://10.100.102.146:8080'
    const res = await axios.get(`${base}/get-sessions`, {
      headers: {
        Authorization: tokenID,
      },
    })

    return res.data as string[]
  } catch (error) {
    return []
  }
}

export function useGetSessions() {
  const [user] = useAtom(userAtom)
  return useQuery({
    queryKey: queryKeystore.sessions,
    queryFn: () => getSessions(user),
    enabled: !!user,
    refetchOnWindowFocus: true,
    // refetchInterval: 1000 * 60, // 2 minute
  })
}
