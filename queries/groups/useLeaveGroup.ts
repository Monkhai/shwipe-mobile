import functions from '@react-native-firebase/functions'
import { LEAVE_GROUP_CFN } from './groupTypes'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/QueryProvider'
import { queryKeystore } from '../queryKeystore'
import { router } from 'expo-router'

type LeaveGroupRequest = {
  groupId: string
}

const fn = functions().httpsCallable<LeaveGroupRequest, void>(LEAVE_GROUP_CFN)

export const useLeaveGroup = () => {
  return useMutation({
    mutationFn: fn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeystore.groups })
      router.dismissTo('/(auth)/groups')
    },
  })
}
