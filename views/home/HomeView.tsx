import { colors } from '@/constants/colors'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React from 'react'
import { View, useColorScheme, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeActionWidget from './components/HomeActionWidget'
import HomeHeader from './components/HomeHeader'
import HomeMenu from './components/HomeMenu'
import PopularGrid from './components/PopularGrid/PopularGrid'

export default function HomeView() {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'
  return (
    <>
      <Canvas style={{ position: 'absolute', width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            colors={[colors[theme].background, colors[theme].primary + '4D']}
            start={{ x: width, y: 0 }}
            end={{ x: 0, y: height }}
          />
        </Rect>
      </Canvas>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 16, flex: 1, width: '100%' }}>
        <HomeHeader />
        <PopularGrid />
        <HomeMenu />
        <HomeActionWidget />
      </View>
    </>
  )
}
