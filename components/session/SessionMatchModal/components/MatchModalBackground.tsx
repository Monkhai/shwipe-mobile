import { colors } from '@/constants/colors'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'

export default function MatchModalBackground() {
  const theme = useColorScheme() ?? 'light'
  const [size, setSize] = useState({ width: 0, height: 0 })
  return (
    <Canvas
      onLayout={event => {
        setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })
      }}
      style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]}
    >
      <Rect x={0} y={0} width={size.width} height={size.height}>
        <LinearGradient
          colors={[colors[theme].success, colors[theme].primary + 'AA']}
          positions={[0.1, 1]}
          start={{ x: size.width, y: 0 }}
          end={{ x: 0, y: size.height }}
        />
      </Rect>
    </Canvas>
  )
}
