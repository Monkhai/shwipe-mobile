import React from 'react'
import { useColorScheme, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Tester() {
  const theme = useColorScheme() ?? 'light'
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}></View>
}
