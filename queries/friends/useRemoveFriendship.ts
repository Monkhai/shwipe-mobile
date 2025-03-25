import functions from '@react-native-firebase/functions'
import { REMOVE_FRIENDSHIP_CFN } from './friendsTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'

type RemoveFriendshipRequest = {
  friendId: string // public id
}

const fn = functions().httpsCallable<RemoveFriendshipRequest, void>(REMOVE_FRIENDSHIP_CFN)

export function useRemoveFriendship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeystore.friends })
      queryClient.invalidateQueries({ queryKey: queryKeystore.users })
    },
  })
}
