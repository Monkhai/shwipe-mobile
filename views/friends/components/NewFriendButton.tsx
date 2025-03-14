import { GeneralButton } from '@/components/ui/buttons/Buttons'
import React from 'react'
import { useColorScheme } from 'react-native'
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import AddFriend from './AddFriend'

interface NewFriendButtonProps {
  onPress: () => void
}

export default function NewFriendButton({ onPress }: NewFriendButtonProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View layout={LinearTransition} entering={ZoomIn} exiting={ZoomOut}>
      <GeneralButton onPress={onPress} hitSlop={24} style={{ borderRadius: 100 }}>
        <AddFriend />
      </GeneralButton>
    </Animated.View>
  )
}
