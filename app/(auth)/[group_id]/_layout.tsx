import { largeSheetOptions } from '@/constants/sheetForm'
import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="invite-to-group" options={{ ...largeSheetOptions, headerShown: false }} />
    </Stack>
  )
}
