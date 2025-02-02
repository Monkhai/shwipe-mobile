import { View, Text, Button } from 'react-native'
import React from 'react'
import { userAtom } from '@/jotai/authAtom'
import { useAtom } from 'jotai'
import { Redirect, Stack } from 'expo-router'
import auth from '@react-native-firebase/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom)

  const logout = async () => {
    await auth().signOut()
  }

  if (!user) {
    console.log('user not found')
    return <Redirect href="/login" />
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Button title="Logout" onPress={logout} />,
        }}
      />
      {children}
    </>
  )
}
