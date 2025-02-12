import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import { sleep } from '@/utils/sleep'
import { ConnectionState, useWebsocketStore } from '@/zustand/websocketStore'
import { useCallback, useEffect } from 'react'

export function useConnectToWS() {
  const { data: onboardingData } = useGetOnboardingData()
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

  useEffect(() => {
    if (!onboardingData || !onboardingData.hasCompletedOnboarding) return
    if (connectionState === ConnectionState.DISCONNECTED) {
      attemptReconnection()
    }
  }, [connectionState])
}
