import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useUpdateFriendRequest } from '@/queries/friendRequests/useUpdateFriendRequest'
import { useAtom } from 'jotai'
import { updateFriendRequestAtom } from '@/jotai/updateFriendRequestAtom'
import { Redirect, router } from 'expo-router'
import { FriendRequestsStatus } from '@/queries/friendRequests/friendRequestsTypes'
import { queryKeystore } from '@/queries/queryKeystore'
import { queryClient } from '@/providers/QueryProvider'
import { useAuth } from '@/providers/AuthProvider'

export default function UpdateFriendRequestView() {
  const [data] = useAtom(updateFriendRequestAtom)
  const { mutate } = useUpdateFriendRequest()

  if (!data) {
    return <Redirect href={'/(auth)/(tabs)/friends'} />
  }

  if (data.direction === 'sent') {
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          style={{
            width: '50%',
            backgroundColor: '#ff2d55',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            mutate(
              {
                friendRequestId: data.friendRequest.request_id,
                status: FriendRequestsStatus.CANCELLED,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests })
                  queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests })
                  router.dismissTo('/(auth)/(tabs)/friends')
                },
              }
            )
          }
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Pressable
        style={{
          width: '50%',
          backgroundColor: '#34c759',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          mutate(
            {
              friendRequestId: data.friendRequest.request_id,
              status: FriendRequestsStatus.ACCEPTED,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests })
                queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests })
                router.dismissTo('/(auth)/(tabs)/friends')
              },
            }
          )
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Accept</Text>
      </Pressable>
      <Pressable
        style={{
          width: '50%',
          backgroundColor: '#ff2d55',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          mutate(
            {
              friendRequestId: data.friendRequest.request_id,
              status: FriendRequestsStatus.REJECTED,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests })
                queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests })
                router.dismissTo('/(auth)/(tabs)/friends')
              },
            }
          )
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Reject</Text>
      </Pressable>
    </View>
  )
}
