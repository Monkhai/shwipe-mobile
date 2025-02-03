import { updateFriendRequestAtom } from '@/jotai/updateFriendRequestAtom'
import { useAuth } from '@/providers/AuthProvider'
import { useGetReceivedFriendRequests } from '@/queries/friendRequests/useGetReceivedFriendRequests'
import { useGetSentFriendRequests } from '@/queries/friendRequests/useGetSentFriendRequests'
import { useSendFriendRequest } from '@/queries/friendRequests/useSendFriendRequest'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { useGetAllUsers } from '@/queries/users/useGetAllUsers'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import { Button, FlatList, Image, Pressable, Text, View } from 'react-native'

export default function FriendsView() {
  const [user] = useAuth()
  const [, setUpdateFriendRequest] = useAtom(updateFriendRequestAtom)
  const { data: allUsers } = useGetAllUsers()
  const { data: friends, refetch: refetchFriends } = useGetUserFriends()
  const { data: sentRequests, refetch: refetchSentRequests } = useGetSentFriendRequests()
  const { data: receivedRequests, refetch: refetchReceivedRequests } = useGetReceivedFriendRequests()
  const { mutate: sendFriendRequest } = useSendFriendRequest()

  function refresh() {
    refetchFriends()
    refetchSentRequests()
    refetchReceivedRequests()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Button title="Refresh" onPress={refresh} />
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>All Users</Text>
        <FlatList
          style={{ width: '100%', padding: 10 }}
          data={allUsers}
          renderItem={({ item }) => {
            const isSentReq = sentRequests?.some(req => req.user_id === item.id)
            const isReceivedReq = receivedRequests?.some(req => req.user_id === item.id)
            const isFriend = friends?.some(friend => friend.id === item.id)
            const isThereAFriendRequest = isSentReq || isReceivedReq
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
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {isFriend ? (
                    <Text>Friends</Text>
                  ) : isThereAFriendRequest ? (
                    isSentReq ? (
                      <Text>Request Sent</Text>
                    ) : (
                      <Text>Request Received</Text>
                    )
                  ) : (
                    <Pressable
                      style={{
                        backgroundColor: '#007AFF',
                        padding: 10,
                        borderRadius: 8,
                      }}
                      onPress={() => sendFriendRequest({ publicId: item.id }, { onError: error => console.log(error) })}
                    >
                      <Text style={{ color: 'white' }}>Send Request</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends</Text>
        <FlatList
          style={{ width: '100%', padding: 10 }}
          data={friends}
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
      </View>

      {/* Sent Requests */}
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sent Requests</Text>
        <FlatList
          style={{ width: '100%', padding: 10 }}
          data={sentRequests}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setUpdateFriendRequest({
                    friendRequest: item,
                    direction: 'sent',
                  })
                  router.push('/(auth)/update-friend-request')
                }}
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
              </Pressable>
            )
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Received Requests</Text>
        <FlatList
          style={{ width: '100%', padding: 10 }}
          data={receivedRequests}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setUpdateFriendRequest({
                    friendRequest: item,
                    direction: 'received',
                  })
                  router.push('/(auth)/update-friend-request')
                }}
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
              </Pressable>
            )
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  )
}
