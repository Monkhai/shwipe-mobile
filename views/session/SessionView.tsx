import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { ClientMessageType, LeaveSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useSessionStore } from '@/zustand/sessionStore'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { router, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { Button, FlatList, Image, Linking, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RestaurantPicker from './components/RestaurantPicker/RestaurantPicker'
import { SessionMatchModal } from '@/components/session/SessionMatchModal'

export default function SessionView() {
  const { isSessionStarted, users, sessionId, matchedRestaurantIndex, restaurants } = useSessionStore()
  const { startSession, sendMessage } = useWebsocketStore()
  const insets = useSafeAreaInsets()

  const handleLeaveSession = () => {
    if (!sessionId) return
    const leaveSessionMessage: UnsignedBaseClientMessage<LeaveSessionMessage> = {
      type: ClientMessageType.LEAVE_SESSION_MESSAGE_TYPE,
      session_id: sessionId,
    }
    sendMessage(leaveSessionMessage)
  }

  useEffect(() => {
    return () => {
      if (!sessionId) return
      const leaveSessionMessage: UnsignedBaseClientMessage<LeaveSessionMessage> = {
        type: ClientMessageType.LEAVE_SESSION_MESSAGE_TYPE,
        session_id: sessionId,
      }
      sendMessage(leaveSessionMessage)
    }
  }, [sessionId])

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => {
            return <Button title="Back" onPress={handleLeaveSession} />
          },
        }}
      />

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingBottom: insets.bottom + 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <FlatList
            style={{ width: '100%' }}
            contentContainerStyle={{ maxHeight: 60 }}
            horizontal
            data={users}
            renderItem={({ item: user }) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#ddd',
                      marginRight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={{ uri: user.photo_url }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                  </View>
                </View>
              )
            }}
          />
          <PrimaryButton onPress={() => router.push('/(auth)/invite-friend')} text="Add Friend" />
        </View>
        <RestaurantPicker />
        {!isSessionStarted ? <Button title="start session" onPress={startSession} /> : <Text>Session Started</Text>}
      </View>
      {matchedRestaurantIndex !== null && restaurants ? (
        <SessionMatchModal onDismiss={router.back} restaurant={restaurants[matchedRestaurantIndex]} />
      ) : null}
    </>
  )
}
