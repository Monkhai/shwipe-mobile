import { useGetSessions } from '@/queries/useGetSessions'
import { ClientMessageType, CreateSessionMessage, JoinSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useWebsocketStore } from '@/zustand/websocketStore'
import React from 'react'
import { Button, FlatList, Pressable, Text, View } from 'react-native'

export default function HomeView() {
  const { connectToWebSocket, isOpen, sendMessage } = useWebsocketStore()
  const { data, refetch, isRefetching } = useGetSessions()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        refreshing={isRefetching}
        onRefresh={refetch}
        style={{ width: '100%', paddingVertical: 20 }}
        data={data ?? []}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No sessions found</Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                const joinSessionMessage: UnsignedBaseClientMessage<JoinSessionMessage> = {
                  type: ClientMessageType.JOIN_SESSION_MESSAGE_TYPE,
                  session_id: item,
                }
                sendMessage(joinSessionMessage)
              }}
              style={{
                padding: 10,
                marginHorizontal: 'auto',
                borderRadius: 8,
                width: '80%',
                backgroundColor: 'white',
              }}
            >
              <Text>{item}</Text>
            </Pressable>
          )
        }}
      />

      <View style={{ flex: 1 }}>
        {!isOpen ? (
          <Button
            onPress={() => {
              connectToWebSocket()
            }}
            title="Connect"
          />
        ) : (
          <Button
            title="Create Session"
            onPress={() => {
              sendMessage({
                type: ClientMessageType.CREATE_SESSION_MESSAGE_TYPE,
              } as UnsignedBaseClientMessage<CreateSessionMessage>)
            }}
          />
        )}
      </View>
    </View>
  )
}
