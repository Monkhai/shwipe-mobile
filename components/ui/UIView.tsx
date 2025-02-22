import { colors } from '@/constants/colors'
// import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions, useColorScheme, useWindowDimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  children?: React.ReactNode
}
export default function UIView({ children }: Props) {
  const { width, height } = useWindowDimensions()
  const theme = useColorScheme() ?? 'light'
  return (
    <>
      <LinearGradient
        colors={[colors[theme].background, colors[theme].primary + '4D']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={{
          width: '100%',
          height: height,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
      />
      {children}
    </>
  )
}
