import { GeneralButton } from '@/components/ui/buttons/Buttons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { ClientMessageType, CreateSessionMessage, StartSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { ConnectionState, useWebsocketStore } from '@/zustand/websocketStore'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
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
  const { connectionState, connectToWebSocket, sendMessage } = useWebsocketStore()
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'

  function startSoloSession() {
    const msg: UnsignedBaseClientMessage<CreateSessionMessage> = {
      type: ClientMessageType.CREATE_SESSION_MESSAGE_TYPE,
    }
    sendMessage(msg)
  }

  useEffect(() => {
    return () => {
      setShowActionWidget(false)
    }
  }, [])

  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        position: 'absolute',
        backgroundColor: colors[theme].platformMaterial,
        borderRadius: 24,
        overflow: 'hidden',
        width: '70%',
        alignSelf: 'center',
        bottom: insets.bottom + 16,
        zIndex: showActionWidget ? 3 : 1,
      }}
    >
      {Platform.OS === 'ios' && (
        <AnimatedBlurView
          experimentalBlurMethod="dimezisBlurView"
          tint={Platform.select({
            ios: undefined,
            android: theme === 'light' ? 'systemThickMaterial' : 'systemThickMaterialDark',
          })}
          intensity={Platform.select({
            ios: 80,
            android: 50,
          })}
          style={{ position: 'absolute', width: '100%', height: 180 }}
        />
      )}
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
              startSoloSession()
            }}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="tertiaryTitle"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
            <Ionicons
              name="people-outline"
              size={24}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="tertiaryTitle"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
            <Ionicons
              name="people-circle-outline"
              size={24}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="tertiaryTitle"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
            <Ionicons
              name={'restaurant-outline'}
              size={20}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="tertiaryTitle"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
