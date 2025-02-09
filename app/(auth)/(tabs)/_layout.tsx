import { Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Tabs screenOptions={{ animation: 'fade' }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="friends" />
      <Tabs.Screen name="groups" />
      <Tabs.Screen name="tester" options={{ headerShown: false }} />
    </Tabs>
  )
}
