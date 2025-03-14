import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoute from '@/shared/ProtectedRoute'
import NewFriendView from '@/views/new-friend/NewFriendView'
import { useLocalSearchParams } from 'expo-router'

export default function NewFriend() {
  return (
    <ProtectedRoute>
      <NewFriendView />
    </ProtectedRoute>
  )
}
