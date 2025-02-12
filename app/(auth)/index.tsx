import { View, Text } from 'react-native'
import React from 'react'
import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import { Redirect } from 'expo-router'

export default function index() {
  const { data: onboardingData, isLoading } = useGetOnboardingData()
  if (isLoading) return null
  if (!onboardingData || !onboardingData.hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboard" />
  }
  return <Redirect href="/(auth)/home" />
}
