import ProtectedRoute from '@/shared/ProtectedRoute'
import GroupInvitationView from '@/views/group-invitation/GroupInvitationView'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <GroupInvitationView />
    </ProtectedRoute>
  )
}
