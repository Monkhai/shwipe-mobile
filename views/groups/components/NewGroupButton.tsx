import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import React from 'react'
import { useColorScheme } from 'react-native'
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import AddGroup from './AddGroup'

interface NewGroupButtonProps {
  onPress: () => void
}

export default function NewGroupButton({ onPress }: NewGroupButtonProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View layout={LinearTransition} entering={ZoomIn} exiting={ZoomOut}>
      <GeneralButton onPress={onPress} hitSlop={24} style={{ borderRadius: 100 }}>
        <AddGroup />
      </GeneralButton>
    </Animated.View>
  )
}
