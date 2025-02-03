import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoute from '@/shared/ProtectedRoute'
import UpdateFriendRequestView from '@/views/update-friend-request/UpdateFriendRequestView'

export default function page() {
  return (
    <ProtectedRoute>
      <UpdateFriendRequestView />
    </ProtectedRoute>
  )
}
