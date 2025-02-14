import { largeSheetOptions } from '@/constants/sheetForm'
import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="invite-to-group" />
      <Stack.Screen name="group-invitation" />
    </Stack>
  )
}
