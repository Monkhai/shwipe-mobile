import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import { smallSheetOptions } from '@/constants/sheetForm'
import { router, Stack, useSegments } from 'expo-router'
import React, { useEffect } from 'react'

export default function _layout() {
  const segments = useSegments()
  const { data: onboardingData, isLoading } = useGetOnboardingData()

  useEffect(() => {
    if (isLoading) return
    if (!onboardingData || !onboardingData.hasCompletedOnboarding) {
      if (segments[1] === 'onboard') return
      router.replace('/(auth)/onboard')
    } else {
      if (segments[1] === 'onboard') router.replace('/(auth)/home')
    }
  }, [onboardingData])

  return (
    <Stack initialRouteName="index" screenOptions={{ gestureEnabled: true, headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="friends" />
      <Stack.Screen name="groups" />
      <Stack.Screen name="onboard" options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name="session/[session_id]" />
      <Stack.Screen name="restaurant/[restaurant_id]" />
      <Stack.Screen name="update-friend-request" options={smallSheetOptions} />
      <Stack.Screen name="invite-friend" options={smallSheetOptions} />
      <Stack.Screen name="new-group" options={smallSheetOptions} />
    </Stack>
  )
}
