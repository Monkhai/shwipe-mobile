import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { ConnectionState, useWebsocketStore } from '@/zustand/websocketStore'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Platform, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  measure,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  showActionWidget: boolean
  setShowActionWidget: (show: boolean) => void
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function HomeActionWidget({ showActionWidget, setShowActionWidget }: Props) {
  const { connectionState, connectToWebSocket } = useWebsocketStore()
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        position: 'absolute',
        backgroundColor: colors[theme].thickMaterial,
        borderRadius: 24,
        overflow: 'hidden',
        width: '70%',
        alignSelf: 'center',
        bottom: insets.bottom + 16,
        zIndex: showActionWidget ? 3 : 1,
      }}
    >
      <AnimatedBlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={80}
        style={{ position: 'absolute', width: '100%', height: 180 }}
      />
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
            disabled={connectionState === ConnectionState.LOADING}
            onPress={() => {
              if (connectionState === ConnectionState.DISCONNECTED) {
                connectToWebSocket()
              } else {
                setShowActionWidget(!showActionWidget)
              }
            }}
          >
            <Ionicons name={'restaurant-outline'} size={20} color={colors[theme].white} />
            <UIText type="tertiaryTitle" color="white">
              {connectionState === ConnectionState.CONNECTED
                ? 'Start Swiping'
                : connectionState === ConnectionState.LOADING
                ? 'Connecting...'
                : connectionState === ConnectionState.DISCONNECTED
                ? 'Reconnect'
                : 'Reconnecting...'}
            </UIText>
          </GeneralButton>
        </Animated.View>
      )}
    </Animated.View>
  )
}
