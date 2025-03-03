import { queryClient } from '@/providers/QueryProvider'
import functions from '@react-native-firebase/functions'
import { useMutation } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { CREATE_NEW_GROUP_CFN } from './groupTypes'
import { router } from 'expo-router'

type CreateGroupRequest = {
  groupName: string
}

const fn = functions().httpsCallable<CreateGroupRequest, void>(CREATE_NEW_GROUP_CFN)

async function createNewGroup(request: CreateGroupRequest) {
  await fn(request)
}

export function useCreateNewGroup() {
  return useMutation({
    mutationFn: createNewGroup,
    onSuccess: () => {
      console.log('test')
      queryClient.invalidateQueries({ queryKey: queryKeystore.groups })
    },
  })
}
