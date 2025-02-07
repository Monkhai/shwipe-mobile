import ProtectedRoute from '@/shared/ProtectedRoute'
import NewGroupView from '@/views/new-group/NewGroupView'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <NewGroupView />
    </ProtectedRoute>
  )
}
