import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeActionWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'

  return (
    <>
      {isExpanded && (
        <Animated.View key="widget" entering={FadeIn} exiting={FadeOut} style={[StyleSheet.absoluteFill, { zIndex: isExpanded ? 2 : -1 }]}>
          <Pressable onPress={() => setIsExpanded(false)} style={{ flex: 1 }}>
            <BlurView key="widget_blur" experimentalBlurMethod="dimezisBlurView" style={{ flex: 1 }} intensity={50} />
          </Pressable>
        </Animated.View>
      )}

      <Animated.View
        layout={LinearTransition}
        style={{
          position: 'absolute',
          backgroundColor: colors[theme].material,
          borderRadius: 24,
          overflow: 'hidden',
          width: '70%',
          left: '15%',
          bottom: insets.bottom + 16,
          zIndex: isExpanded ? 3 : 1,
        }}
      >
        {isExpanded && (
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
                setIsExpanded(false)
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
                setIsExpanded(false)
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
                setIsExpanded(false)
              }}
            >
              <Ionicons name="people-circle-outline" size={24} color={colors[theme].white} />
              <UIText type="secondaryTitle" color="white">
                Group Session
              </UIText>
            </GeneralButton>
          </Animated.View>
        )}
        {!isExpanded && (
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
                setIsExpanded(!isExpanded)
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
    </>
  )
}
