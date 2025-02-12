import auth from '@react-native-firebase/auth'
import functions from '@react-native-firebase/functions'
import { DELETE_ACCOUNT_CFN } from './userTypes'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'

const fn = functions().httpsCallable<void, void>(DELETE_ACCOUNT_CFN)

export function useDeleteAccount() {
  return useMutation({
    mutationFn: fn,
    onSettled: () => {
      void auth().signOut()
      router.replace('/')
    },
  })
}
