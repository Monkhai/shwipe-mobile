import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { useGetSentFriendRequests } from '@/queries/friendRequests/useGetSentFriendRequests copy'
import { useGetReceivedFriendRequests } from '@/queries/friendRequests/useGetReceivedFriendRequests'
import { useGetAllUsers } from '@/queries/users/useGetAllUsers'

export default function FriendsView() {
  const { data: allUsers } = useGetAllUsers()
  const { data: friends } = useGetUserFriends()
  const { data: sendRequests } = useGetSentFriendRequests()
  const { data: receivedRequest } = useGetReceivedFriendRequests()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <FlatList
        style={{ width: '100%', padding: 10 }}
        data={allUsers}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 8,
                padding: 10,
              }}
            >
              <Image source={{ uri: item.photo_url }} style={{ width: 50, height: 50, borderRadius: 50 }} />
              <Text>{item.display_name}</Text>
            </View>
          )
        }}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends</Text>
      </View>
    </View>
  )
}
