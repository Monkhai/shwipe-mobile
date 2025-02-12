import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Blur, Canvas, Rect } from '@shopify/react-native-skia'
import { useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

interface Props {
  width: number
  height: number
}
export default function Skeleton({ width, height }: Props) {
  const x = useSharedValue(-width + 40 / 2)

  useEffect(() => {
    const timing = withTiming(width + 40, { duration: 2000 })
    const delay = withDelay(100, timing)
    const repeat = withRepeat(delay, -1, false)
    x.value = repeat
  }, [])
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect color={'#CCCCCE'} x={0} y={0} width={width} height={height} />
      <Rect opacity={0.8} color={'white'} x={x} y={0} width={width / 2} height={height}>
        <Blur blur={20} />
      </Rect>
    </Canvas>
  )
}
