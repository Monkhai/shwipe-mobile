import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="invite-to-group" options={sheetOptions} />
    </Stack>
  )
}

const sheetOptions: Record<string, any> = {
  contentStyle: {
    height: '100%',
  },
  presentation: 'formSheet',
  gestureDirection: 'vertical',
  animation: 'slide_from_bottom',
  sheetGrabberVisible: true,
  sheetInitialDetentIndex: 0,
  sheetAllowedDetents: [0.8],
}
