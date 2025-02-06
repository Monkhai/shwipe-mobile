import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Canvas, Skia, Path, LinearGradient, vec } from '@shopify/react-native-skia'
import { gradients } from '@/constants/colors'

interface Props {
  size: number
}
const PADDING = 20
export default function X({ size }: Props) {
  const theme = useColorScheme() ?? 'light'
  const path = Skia.Path.Make()
  path.moveTo(PADDING, PADDING)
  path.lineTo(size - PADDING, size - PADDING)
  path.moveTo(PADDING, size - PADDING)
  path.lineTo(size - PADDING, PADDING)

  return (
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} style="stroke" strokeWidth={size / 5} strokeCap={'round'} strokeJoin={'round'} color="black">
        <LinearGradient start={vec(0, 0)} end={vec(size, size)} colors={gradients.x[theme]} />
      </Path>
    </Canvas>
  )
}
export function WhiteX({ size }: Props) {
  const path = Skia.Path.Make()
  const padding = size - 14
  path.moveTo(padding, padding)
  path.lineTo(size - padding, size - padding)
  path.moveTo(padding, size - padding)
  path.lineTo(size - padding, padding)

  return (
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} style="stroke" strokeWidth={size / 5} strokeCap={'round'} strokeJoin={'round'} color="white" />
    </Canvas>
  )
}
