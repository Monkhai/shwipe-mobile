import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import Modal, { ModalRef } from '@/components/ui/Modal/Modal'
import { userAtom } from '@/jotai/authAtom'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { Button, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native'

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
