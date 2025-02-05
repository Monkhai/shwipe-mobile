import { GeneralButton, PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import { ClientMessageType, CreateSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useWebsocketStore, ConnectionState } from '@/zustand/websocketStore'
import React, { useCallback } from 'react'
import { View, useColorScheme, ScrollView } from 'react-native'
import Animated, { useAnimatedStyle, withRepeat, withSpring, withTiming, useSharedValue, interpolateColor } from 'react-native-reanimated'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import FriendsList from '@/components/friends/FriendsList/FriendsList'
import { sleep } from '@/utils/sleep'

export default function HomeView() {
  const { sendMessage } = useWebsocketStore()

  const handleCreateSession = () => {
    const message: UnsignedBaseClientMessage<CreateSessionMessage> = {
      type: ClientMessageType.CREATE_SESSION_MESSAGE_TYPE,
    }
    sendMessage(message)
  }

  return (
    <View style={{ flex: 1 }}>
      <ConnectionStatusIndicator />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {/* Welcome Section */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <UIText type="largeTitle">Hey there! 👋</UIText>
          </View>
          <View>
            <UIText type="body" color="secondaryLabel">
              Ready to find your next favorite restaurant?
            </UIText>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 15 }}>
            <UIText type="titleEmphasized">Quick Actions</UIText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton
                type="primary"
                textType="bodyEmphasized"
                text="New Session"
                onPress={handleCreateSession}
                style={{ minWidth: undefined }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SecondaryButton
                text="Add Friends"
                textType="bodyEmphasized"
                onPress={() => {
                  alert('Add friends feature coming soon!')
                }}
                type="primary"
                style={{ minWidth: undefined }}
              />
            </View>
          </View>
        </View>

        {/* Friends Section */}
        <View>
          <View style={{ marginBottom: 15 }}>
            <UIText type="titleEmphasized">Your Friends</UIText>
          </View>
          <FriendsList />
        </View>
      </ScrollView>
    </View>
  )
}

function ConnectionStatusIndicator() {
  const { connectionState, connectToWebSocket } = useWebsocketStore()
  const theme = useColorScheme() ?? 'light'
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.5)

  const attemptReconnection = useCallback(async () => {
    let maxTries = 5
    const state = useWebsocketStore.getState().connectionState
    while (maxTries > 0 && state === ConnectionState.DISCONNECTED) {
      console.log(state)
      await sleep(5)
      if (state === ConnectionState.DISCONNECTED) {
        connectToWebSocket()
      }
      maxTries--
    }
  }, [connectionState])

  React.useEffect(() => {
    if (connectionState === ConnectionState.DISCONNECTED) {
      attemptReconnection()
    }

    if (connectionState !== ConnectionState.DISCONNECTED) {
      scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true)
      opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true)
    } else {
      scale.value = withSpring(1)
      opacity.value = withSpring(1)
    }
  }, [connectionState])

  const dotStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      opacity.value,
      [1, 0.5],
      [
        connectionState === ConnectionState.CONNECTED ? colors[theme].success : colors[theme].danger,
        connectionState === ConnectionState.CONNECTED ? colors[theme].success + '80' : colors[theme].danger + '80',
      ]
    )

    return {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor,
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <GeneralButton
      style={{
        position: 'absolute',
        zIndex: 1000,
        top: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 8,
        paddingRight: 16,
        borderRadius: 20,
        backgroundColor: colors[theme].elevatedBackground,
      }}
      onPress={() => {
        if (connectionState === ConnectionState.DISCONNECTED) {
          connectToWebSocket()
        }
      }}
    >
      <Animated.View style={dotStyle} />
      <UIText
        type="caption"
        color={
          connectionState === ConnectionState.CONNECTED ? 'success' : connectionState === ConnectionState.LOADING ? 'warning' : 'danger'
        }
      >
        {connectionState === ConnectionState.CONNECTED
          ? 'Connected'
          : connectionState === ConnectionState.LOADING
          ? 'Connecting...'
          : 'Disconnected'}
      </UIText>
    </GeneralButton>
  )
}
