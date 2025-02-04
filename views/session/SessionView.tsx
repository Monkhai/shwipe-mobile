import { ClientMessageType, LeaveSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useSessionStore } from '@/zustand/sessionStore'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Button, FlatList, Image, Pressable, Text, View } from 'react-native'
import RestaurantPicker from './components/RestaurantPicker/RestaurantPicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SessionView() {
  const { isSessionStarted, users, sessionId } = useSessionStore()
  const { startSession, sendMessage } = useWebsocketStore()
  const insets = useSafeAreaInsets()

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <Button
                title="Back"
                onPress={() => {
                  if (!sessionId) return
                  const leaveSessionMessage: UnsignedBaseClientMessage<LeaveSessionMessage> = {
                    type: ClientMessageType.LEAVE_SESSION_MESSAGE_TYPE,
                    session_id: sessionId,
                  }
                  sendMessage(leaveSessionMessage)
                }}
              />
            )
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
          <Link asChild href="/(auth)/invite-friend">
            <Pressable>
              <Text>Invite Friend</Text>
            </Pressable>
          </Link>
        </View>
        <RestaurantPicker />
        {!isSessionStarted ? <Button title="start session" onPress={startSession} /> : <Text>Session Started</Text>}
      </View>
    </>
  )
}
