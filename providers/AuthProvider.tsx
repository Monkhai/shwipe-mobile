import { userAtom } from '@/jotai/authAtom'
import auth from '@react-native-firebase/auth'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { updateUserPushToken } from '@/queries/users/updateUserPushToken'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerForPushNotificationsAsync } from './NotificationProvider/registerNotifications'

const PUSH_TOKEN_STORAGE_KEY = '@push_token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (!user) {
        setUser(null)
      } else {
        setUser(user)
        try {
          const newPushToken = await registerForPushNotificationsAsync()
          const storedPushToken = await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY)

          if (newPushToken && newPushToken !== storedPushToken) {
            await updateUserPushToken(newPushToken)
            await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, newPushToken)
          }
        } catch (error) {
          console.error('Failed to handle push token:', error)
        }
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <View />
  }

  return <>{children}</>
}

export function useAuth() {
  return useAtom(userAtom)
}
