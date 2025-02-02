import { View, Text } from 'react-native'
import React from 'react'
import { userAtom } from '@/jotai/authAtom'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'

export default function index() {
  const [user] = useAtom(userAtom)
  if (user) {
    return <Redirect href="/home" />
  }

  return <Redirect href="/login" />
}
