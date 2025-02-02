import { View, Text, Button, Image, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSessionStore } from '@/zustand/sessionStore'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { ClientMessageType, UpdateIndexMessage, UnsignedBaseClientMessage, LeaveSessionMessage } from '@/wsHandler/clientMessagesTypes'
import RestaurantPicker from './components/RestaurantPicker/RestaurantPicker'

export default function SessionView() {
  const { isSessionStarted, users, sessionId } = useSessionStore()
  const { startSession, sendMessage } = useWebsocketStore()

  return (
    <>
      <Stack.Screen
        options={{
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!isSessionStarted ? <Button title="start session" onPress={startSession} /> : <Text>Session Started</Text>}
        <FlatList
          data={users}
          renderItem={({ item }) => (
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
                {item.photo_url ? (
                  <Image source={{ uri: item.photo_url }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                ) : (
                  <Text style={{ color: '#666' }}>{item.user_name?.charAt(0)?.toUpperCase() || '?'}</Text>
                )}
              </View>
              <Text>{item.user_name || 'Anonymous'}</Text>
            </View>
          )}
        />
        <RestaurantPicker />
      </View>
    </>
  )
}

function RestaurantView() {
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const { session_id } = useLocalSearchParams<{ session_id: string }>()
  const { restaurants, isSessionStarted } = useSessionStore()
  const { sendMessage } = useWebsocketStore()
  if (!restaurants || restaurants.length === 0 || !isSessionStarted) return null

  const restaurant = restaurants[restaurantIndex]
  const link = `${restaurant.photos[0]}&key=AIzaSyALFutkrFeGGS8jR_HVgO1xUqrlJ-_ZZm4`

  function handlePress() {
    setRestaurantIndex(prev => prev + 1)
    const updateIndexMessage: UnsignedBaseClientMessage<UpdateIndexMessage> = {
      type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE,
      index: restaurantIndex + 1,
      session_id,
    }
    sendMessage(updateIndexMessage)
  }

  return (
    <View style={{ position: 'relative' }}>
      <Text>{restaurants[restaurantIndex].name}</Text>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image source={{ uri: link }} width={200} height={300} style={{ borderRadius: 10 }} />
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Pressable
            onPress={handlePress}
            style={{
              backgroundColor: 'red',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
          </Pressable>
          <Pressable
            onPress={handlePress}
            style={{
              backgroundColor: 'green',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
