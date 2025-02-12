import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import Animated, { LinearTransition, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function UIBlur() {
  const size = useSharedValue({ width: 0, height: 0 })

  const height = useDerivedValue(() => size.value.height)
  const width = useDerivedValue(() => size.value.width)

  return (
    <Canvas
      onSize={size}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '600%',
      }}
    >
      <Rect x={0} y={0} width={width} height={height} opacity={0.0} />
      <BlurMask blur={10} style="normal" />
    </Canvas>
  )
}
