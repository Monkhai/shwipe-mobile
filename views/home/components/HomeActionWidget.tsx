import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  showActionWidget: boolean
  setShowActionWidget: (show: boolean) => void
}
export default function HomeActionWidget({ showActionWidget, setShowActionWidget }: Props) {
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        position: 'absolute',
        backgroundColor: colors[theme].definedMaterial,
        borderRadius: 24,
        overflow: 'hidden',
        width: '70%',
        alignSelf: 'center',
        bottom: insets.bottom + 16,
        zIndex: showActionWidget ? 3 : 1,
      }}
    >
      {showActionWidget && (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <GeneralButton
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
            onPress={() => {
              setShowActionWidget(false)
            }}
          >
            <Ionicons name="person-outline" size={24} color={colors[theme].white} />
            <UIText type="secondaryTitle" color="white">
              Solo Session
            </UIText>
          </GeneralButton>
          <GeneralButton
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
            onPress={() => {
              setShowActionWidget(false)
            }}
          >
            <Ionicons name="people-outline" size={24} color={colors[theme].white} />
            <UIText type="secondaryTitle" color="white">
              Friend Session
            </UIText>
          </GeneralButton>
          <GeneralButton
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
            onPress={() => {
              setShowActionWidget(false)
            }}
          >
            <Ionicons name="people-circle-outline" size={24} color={colors[theme].white} />
            <UIText type="secondaryTitle" color="white">
              Group Session
            </UIText>
          </GeneralButton>
        </Animated.View>
      )}
      {!showActionWidget && (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <GeneralButton
            style={{
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
            onPress={() => {
              setShowActionWidget(!showActionWidget)
            }}
          >
            <Ionicons name={'restaurant-outline'} size={20} color={colors[theme].white} />
            <UIText type="tertiaryTitle" color="white">
              Start Swiping
            </UIText>
          </GeneralButton>
        </Animated.View>
      )}
    </Animated.View>
  )
}
