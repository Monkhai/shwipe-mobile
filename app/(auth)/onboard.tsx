import ProtectedRoute from '@/shared/ProtectedRoute'
import OnboardView from '@/views/onboard/OnboardView'
import React from 'react'

export default function onboard() {
  return (
    <ProtectedRoute>
      <OnboardView />
    </ProtectedRoute>
  )
}
