import { View, Text, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSessionStore } from '@/zustand/sessionStore'
import { useSendSessionInvitation } from '@/queries/sessions/useSendSessionInvitation'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { Redirect } from 'expo-router'

export default function InviteFriendView() {
  const { sessionId, users } = useSessionStore()
  const { data: friends, isLoading: isLoadingFriends } = useGetUserFriends()
  const { mutate: sendSessionInvitation, isPending, isError, isSuccess } = useSendSessionInvitation()

  if (!sessionId) {
    return <Redirect href="/(auth)/(tabs)/home" />
  }

  if (isLoadingFriends) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading friends...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={friends}
        renderItem={({ item }) => {
          const isInSession = users.some(user => user.id === item.id)
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 8,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: item.photo_url }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                <Text>{item.display_name}</Text>
              </View>
              {isPending ? (
                <ActivityIndicator />
              ) : isInSession ? (
                <Text>In Session</Text>
              ) : (
                <Pressable
                  style={{
                    backgroundColor: '#007AFF',
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onPress={() => sendSessionInvitation({ sessionId, userId: item.id })}
                >
                  <Text style={{ color: 'white' }}>Send Request</Text>
                </Pressable>
              )}
            </View>
          )
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  )
}
