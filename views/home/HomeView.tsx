import UIView from '@/components/ui/UIView'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeActionWidget from './components/HomeActionWidget'
import HomeHeader from './components/HomeHeader'
import HomeMenu from './components/HomeMenu'
import PopularGrid from './components/PopularGrid/PopularGrid'

export default function HomeView() {
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'
  const [showMenu, setShowMenu] = useState(false)
  const [showActionWidget, setShowActionWidget] = useState(false)
  return (
    <UIView>
      <View style={{ paddingTop: insets.top + 16, gap: 32, flex: 1, width: '100%' }}>
        <HomeHeader />
        <PopularGrid />
        {(showMenu || showActionWidget) && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={[StyleSheet.absoluteFill, { zIndex: 3 }]}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => {
                if (showMenu) setShowMenu(false)
                if (showActionWidget) setShowActionWidget(false)
              }}
            />
          </Animated.View>
        )}
        <HomeMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        <HomeActionWidget showActionWidget={showActionWidget} setShowActionWidget={setShowActionWidget} />
      </View>
    </UIView>
  )
}
