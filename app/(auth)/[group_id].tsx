import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import NotFoundView from '@/views/not-found/NotFoundView'

export default function page() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()

  const group = useGetGroup(group_id)

  if (!group) {
    return <NotFoundView />
  }

  console.log(group)

  return (
    <View>
      <Text>group_id</Text>
    </View>
  )
}
