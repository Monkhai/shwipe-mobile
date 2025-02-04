import ProtectedRoute from '@/shared/ProtectedRoute'
import InviteFriendView from '@/views/invite-friend/InviteFriendView'
import React from 'react'

export default function inviteFriend() {
  return (
    <ProtectedRoute>
      <InviteFriendView />
    </ProtectedRoute>
  )
}
