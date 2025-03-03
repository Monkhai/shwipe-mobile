import { colors } from '@/constants/colors'
import { Canvas, FitBox, Path } from '@shopify/react-native-skia'
import React from 'react'
import { useColorScheme } from 'react-native'

const size = 32
export default function AddFriend() {
  const theme = useColorScheme() ?? 'light'

  return (
    <Canvas style={{ width: size, height: size }}>
      <FitBox src={{ x: 0, y: 0, width: 40, height: 40 }} dst={{ x: 0, y: 0, width: size, height: size }}>
        <Path
          path="M20 12C16.13 12 13 15.13 13 19C13 22.87 16.13 26 20 26C23.87 26 27 22.87 27 19C27 15.13 23.87 12 20 12ZM25 20H21V24H19V20H15V18H19V14H21V18H25V20Z"
          color={colors[theme].label}
        />
      </FitBox>
    </Canvas>
  )
}
