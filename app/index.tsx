import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import { userAtom } from '@/jotai/authAtom'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'

export default function index() {
  const { data: onboardingData, isLoading } = useGetOnboardingData()
  const [user] = useAtom(userAtom)

  if (isLoading) return null

  if (!onboardingData || !onboardingData.hasCompletedOnboarding) {
    return <Redirect href="/onboard" />
  }

  if (user) {
    return <Redirect href="/home" />
  }

  return <Redirect href="/login" />
}
