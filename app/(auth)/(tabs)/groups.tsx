import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoute from '@/shared/ProtectedRoute'
import GroupsView from '@/views/groups/GroupsView'

export default function groups() {
  return (
    <ProtectedRoute>
      <GroupsView />
    </ProtectedRoute>
  )
}
