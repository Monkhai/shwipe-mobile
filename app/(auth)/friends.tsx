import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoute from '@/shared/ProtectedRoute'
import FriendsView from '@/views/friends/FriendsView'

export default function friends() {
  return (
    <ProtectedRoute>
      <FriendsView />
    </ProtectedRoute>
  )
}
