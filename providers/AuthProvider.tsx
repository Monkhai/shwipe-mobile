import { userAtom } from '@/jotai/authAtom'
import auth from '@react-native-firebase/auth'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        setUser(null)
      } else {
        setUser(user)
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
