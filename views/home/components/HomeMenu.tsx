import { AnimatedPressable } from '@/components/ui/buttons/AnimatedPressable'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? 'light'
  const insets = useSafeAreaInsets()
  const PADDING = 16
  const GAP = 12

  return (
    <>
      {isOpen && (
        <Animated.View key="menu" entering={FadeIn} exiting={FadeOut} style={[StyleSheet.absoluteFill, {}]}>
          <Pressable style={{ flex: 1 }} onPress={() => setIsOpen(false)}>
            <BlurView key="menu_blur" experimentalBlurMethod="dimezisBlurView" style={{ flex: 1 }} intensity={50} />
          </Pressable>
        </Animated.View>
      )}

      <Animated.View
        layout={LinearTransition}
        style={[
          {
            position: 'absolute',
            right: 16,
            top: insets.top + 16,
            backgroundColor: colors[theme].material,
            borderRadius: 24,
            minWidth: 44,
            minHeight: 44,
            zIndex: isOpen ? 3 : 1,
            overflow: 'hidden',
          },
        ]}
      >
        {!isOpen && (
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Ionicons name="menu-outline" size={22} color={colors[theme].white} />
          </AnimatedPressable>
        )}
        {isOpen && (
          <Animated.View style={{ flex: 1, padding: PADDING, gap: GAP, width: 200 }} entering={FadeIn} exiting={FadeOut}>
            <GeneralButton style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => setIsOpen(false)}>
              <Ionicons name="people-outline" size={20} color={colors[theme].white} />
              <UIText type="body" color="white">
                Users
              </UIText>
            </GeneralButton>
            <GeneralButton style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => setIsOpen(false)}>
              <Ionicons name="people-circle-outline" size={20} color={colors[theme].white} />
              <UIText type="body" color="white">
                Groups
              </UIText>
            </GeneralButton>
            <GeneralButton style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => setIsOpen(false)}>
              <Ionicons name="log-out-outline" size={20} color={colors[theme].white} />
              <UIText type="body" color="white">
                Logout
              </UIText>
            </GeneralButton>
            <GeneralButton style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => setIsOpen(false)}>
              <Ionicons name="trash-outline" size={20} color={colors[theme].danger} />
              <UIText type="body" color="danger">
                Delete account
              </UIText>
            </GeneralButton>
          </Animated.View>
        )}
      </Animated.View>
    </>
  )
}
