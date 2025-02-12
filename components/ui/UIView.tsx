import { View, Text, useWindowDimensions, useColorScheme } from 'react-native'
import React, { Fragment } from 'react'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import { colors } from '@/constants/colors'

interface Props {
  children: React.ReactNode
}
export default function UIView({ children }: Props) {
  const { width, height } = useWindowDimensions()
  const theme = useColorScheme() ?? 'light'
  return (
    <Fragment>
      <Canvas style={{ position: 'absolute', width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            colors={[colors[theme].background, colors[theme].primary + '4D']}
            start={{ x: width, y: 0 }}
            end={{ x: 0, y: height }}
          />
        </Rect>
      </Canvas>
      {children}
    </Fragment>
  )
}
