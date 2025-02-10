import { Canvas, FitBox, Path } from '@shopify/react-native-skia'
import React from 'react'

const size = 60
export default function NewHeart() {
  return (
    <Canvas style={{ width: size, height: size }}>
      <FitBox src={{ x: 0, y: 0, width: 40, height: 40 }} dst={{ x: 0, y: 0, width: size, height: size }}>
        <Path
          path="M19.6973 29.5254C19.9023 29.5254 20.1953 29.3887 20.4102 29.2617C25.9082 25.7461 29.3945 21.6543 29.3945 17.4941C29.3945 14.0371 27.0215 11.5957 23.9551 11.5957C22.0508 11.5957 20.5859 12.6504 19.6973 14.2617C18.8281 12.6602 17.3437 11.5957 15.4394 11.5957C12.373 11.5957 10 14.0371 10 17.4941C10 21.6543 13.4863 25.7461 18.9941 29.2617C19.1992 29.3887 19.4922 29.5254 19.6973 29.5254Z"
          color="white"
        />
      </FitBox>
    </Canvas>
  )
}
