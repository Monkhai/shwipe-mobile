import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="session/[session_id]" />
      <Stack.Screen
        name="update-friend-request"
        options={{
          contentStyle: {
            height: '100%',
          },

          presentation: 'formSheet',
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
          sheetGrabberVisible: true,
          sheetInitialDetentIndex: 0,
          sheetAllowedDetents: [0.5],
        }}
      />
      <Stack.Screen
        name="invite-friend"
        options={{
          contentStyle: {
            height: '100%',
          },

          presentation: 'formSheet',
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
          sheetGrabberVisible: true,
          sheetInitialDetentIndex: 0,
          sheetAllowedDetents: [0.5],
        }}
      />
    </Stack>
  )
}
