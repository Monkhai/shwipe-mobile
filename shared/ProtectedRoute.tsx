import { useConnectToWS } from '@/hooks/useConnectToWS'
import { userAtom } from '@/jotai/authAtom'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  useConnectToWS()
  const [user] = useAtom(userAtom)

  if (!user) {
    return <Redirect href="/login" />
  }

  return <>{children}</>
}
