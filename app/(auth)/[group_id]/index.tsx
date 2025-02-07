import { View, Text } from 'react-native'
import React from 'react'
import ProtectedRoute from '@/shared/ProtectedRoute'
import GroupView from '@/views/group/GroupView'

export default function index() {
  return (
    <ProtectedRoute>
      <GroupView />
    </ProtectedRoute>
  )
}
