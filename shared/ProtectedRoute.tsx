import { userAtom } from '@/jotai/authAtom'
import { sleep } from '@/utils/sleep'
import { ConnectionState, useWebsocketStore } from '@/zustand/websocketStore'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import React, { useCallback } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom)
  const { connectionState, connectToWebSocket } = useWebsocketStore()
  const attemptReconnection = useCallback(async () => {
    let maxTries = 5
    while (maxTries > 0 && connectionState === ConnectionState.DISCONNECTED) {
      await sleep(5)
      if (connectionState === ConnectionState.DISCONNECTED) {
        connectToWebSocket()
      }
      maxTries--
    }
  }, [connectionState])

  React.useEffect(() => {
    if (connectionState === ConnectionState.DISCONNECTED) {
      attemptReconnection()
    }
  }, [connectionState])

  if (!user) {
    console.log('user not found')
    return <Redirect href="/login" />
  }

  return <>{children}</>
}
