import ProtectedRoute from '@/shared/ProtectedRoute'
import HomeView from '@/views/home/HomeView'
import React from 'react'

export default function home() {
  return (
    <ProtectedRoute>
      <HomeView />
    </ProtectedRoute>
  )
}
