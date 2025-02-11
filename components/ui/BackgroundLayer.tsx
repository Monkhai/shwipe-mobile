import React from 'react'
import { colors } from '@/constants/colors'
import { Canvas, Circle, LinearGradient, Rect, RoundedRect } from '@shopify/react-native-skia'
import { useColorScheme, useWindowDimensions } from 'react-native'

export default function BackgroundLayer() {
  const { width, height } = useWindowDimensions()
  const theme = useColorScheme() ?? 'light'
  return (
    <>
      <Canvas style={{ height: '100%', width: '100%', position: 'absolute' }}>
        <Rect opacity={0.4} y={0} x={0} width={width} height={height} color={'white'}>
          <LinearGradient
            colors={[colors[theme].success, colors[theme].primary]}
            positions={[0.3, 1]}
            start={{ x: width, y: 0 }}
            end={{ x: 0, y: height }}
          />
        </Rect>
        {/* Decorative shapes */}
        <Circle cx={width * 0.8} cy={height * 0.15} r={120} color={colors[theme].success + '15'} />
        <Circle cx={width * 0.9} cy={height * 0.18} r={80} color={colors[theme].success + '10'} />
        <Circle cx={width * 0.15} cy={height * 0.75} r={180} color={colors[theme].primary + '15'} />
        <Circle cx={width * 0.2} cy={height * 0.8} r={120} color={colors[theme].primary + '10'} />
        <RoundedRect
          x={width * 0.4}
          y={height * 0.4}
          width={width * 0.6}
          height={height * 0.1}
          r={20}
          color={colors[theme].success + '10'}
        />
        <RoundedRect
          x={-width * 0.2}
          y={height * 0.2}
          width={width * 0.6}
          height={height * 0.15}
          r={20}
          color={colors[theme].primary + '10'}
        />
      </Canvas>
    </>
  )
}
