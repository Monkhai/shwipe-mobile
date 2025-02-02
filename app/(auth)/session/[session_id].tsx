import ProtectedRoute from '@/shared/ProtectedRoute'
import SessionView from '@/views/session/SessionView'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <SessionView />
    </ProtectedRoute>
  )
}
