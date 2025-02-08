import { smallSheetOptions } from '@/constants/sheetForm'
import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="session/[session_id]" />
      <Stack.Screen name="update-friend-request" options={smallSheetOptions} />
      <Stack.Screen name="invite-friend" options={smallSheetOptions} />
      <Stack.Screen name="new-group" options={smallSheetOptions} />
    </Stack>
  )
}
