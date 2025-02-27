import { colors } from '@/constants/colors'
// import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions, useColorScheme, useWindowDimensions, View } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'

interface Props {
  children?: React.ReactNode
}
export default function UIView({ children }: Props) {
  const { width, height } = useWindowDimensions()
  const theme = useColorScheme() ?? 'light'
  return (
    <>
      <Canvas style={{ width: '100%', height: height, position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}>
        <Rect x={0} y={0} width={width} height={height} color={colors[theme].background}>
          <LinearGradient
            colors={[colors[theme].background, colors[theme].primary + '0D']}
            start={{ x: width, y: 0 }}
            end={{ x: 0, y: height }}
          />
        </Rect>
      </Canvas>
      {children}
    </>
  )
}
