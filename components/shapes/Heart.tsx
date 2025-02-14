import { gradients } from '@/constants/colors'
import { Canvas, LinearGradient, Path, Skia, vec } from '@shopify/react-native-skia'
import React from 'react'
import { useColorScheme } from 'react-native'

interface Props {
  size: number
}

const PADDING = 0 // Increased padding to prevent cutoff
const offsetX = PADDING // Offset remains the same

export default function Heart({ size }: Props) {
  const theme = useColorScheme() ?? 'light'
  const scale = (size - PADDING * 2) / 24 // Scale adjusted for new padding
  const path = Skia.Path.Make()

  // M20.84 5.11
  path.moveTo(20.84 * scale + offsetX, 5.11 * scale + PADDING)

  // Left side of heart
  path.cubicTo(
    20.33 * scale + offsetX,
    4.6 * scale + PADDING,
    19.72 * scale + offsetX,
    4.19 * scale + PADDING,
    19.06 * scale + offsetX,
    3.92 * scale + PADDING
  )
  path.cubicTo(
    18.39 * scale + offsetX,
    3.64 * scale + PADDING,
    17.67 * scale + offsetX,
    3.5 * scale + PADDING,
    16.95 * scale + offsetX,
    3.5 * scale + PADDING
  )
  path.cubicTo(
    16.23 * scale + offsetX,
    3.5 * scale + PADDING,
    15.51 * scale + offsetX,
    3.64 * scale + PADDING,
    14.84 * scale + offsetX,
    3.92 * scale + PADDING
  )
  path.cubicTo(
    14.18 * scale + offsetX,
    4.19 * scale + PADDING,
    13.57 * scale + offsetX,
    4.6 * scale + PADDING,
    13.06 * scale + offsetX,
    5.11 * scale + PADDING
  )

  // Center dip
  path.lineTo(12 * scale + offsetX, 6.17 * scale + PADDING)
  path.lineTo(10.94 * scale + offsetX, 5.11 * scale + PADDING)

  // Right side of heart
  path.cubicTo(
    9.91 * scale + offsetX,
    4.08 * scale + PADDING,
    8.51 * scale + offsetX,
    3.5 * scale + PADDING,
    7.05 * scale + offsetX,
    3.5 * scale + PADDING
  )
  path.cubicTo(
    5.59 * scale + offsetX,
    3.5 * scale + PADDING,
    4.19 * scale + offsetX,
    4.08 * scale + PADDING,
    3.16 * scale + offsetX,
    5.11 * scale + PADDING
  )
  path.cubicTo(
    2.13 * scale + offsetX,
    6.14 * scale + PADDING,
    1.55 * scale + offsetX,
    7.54 * scale + PADDING,
    1.55 * scale + offsetX,
    9 * scale + PADDING
  )
  path.cubicTo(
    1.55 * scale + offsetX,
    10.46 * scale + PADDING,
    2.13 * scale + offsetX,
    11.86 * scale + PADDING,
    3.16 * scale + offsetX,
    12.89 * scale + PADDING
  )

  // Bottom point and back up
  path.lineTo(4.22 * scale + offsetX, 13.95 * scale + PADDING)
  path.lineTo(12 * scale + offsetX, 21.73 * scale + PADDING)
  path.lineTo(19.78 * scale + offsetX, 13.95 * scale + PADDING)
  path.lineTo(20.84 * scale + offsetX, 12.89 * scale + PADDING)

  // Add the missing right curve
  path.cubicTo(
    21.87 * scale + offsetX,
    11.86 * scale + PADDING,
    22.45 * scale + offsetX,
    10.46 * scale + PADDING,
    22.45 * scale + offsetX,
    9 * scale + PADDING
  )
  path.cubicTo(
    22.45 * scale + offsetX,
    7.54 * scale + PADDING,
    21.87 * scale + offsetX,
    6.14 * scale + PADDING,
    20.84 * scale + offsetX,
    5.11 * scale + PADDING
  )

  // Close the path
  path.close()

  return (
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} style="fill">
        <LinearGradient start={vec(PADDING, PADDING)} end={vec(size - PADDING, size - PADDING)} colors={gradients.heart[theme]} />
      </Path>
    </Canvas>
  )
}
export function WhiteHeart({ size }: Props) {
  const theme = useColorScheme() ?? 'light'
  const scale = (size - PADDING * 2) / 24 // Scale adjusted for new padding
  const path = Skia.Path.Make()

  // M20.84 5.11
  path.moveTo(20.84 * scale + offsetX, 5.11 * scale + PADDING)

  // Left side of heart
  path.cubicTo(
    20.33 * scale + offsetX,
    4.6 * scale + PADDING,
    19.72 * scale + offsetX,
    4.19 * scale + PADDING,
    19.06 * scale + offsetX,
    3.92 * scale + PADDING
  )
  path.cubicTo(
    18.39 * scale + offsetX,
    3.64 * scale + PADDING,
    17.67 * scale + offsetX,
    3.5 * scale + PADDING,
    16.95 * scale + offsetX,
    3.5 * scale + PADDING
  )
  path.cubicTo(
    16.23 * scale + offsetX,
    3.5 * scale + PADDING,
    15.51 * scale + offsetX,
    3.64 * scale + PADDING,
    14.84 * scale + offsetX,
    3.92 * scale + PADDING
  )
  path.cubicTo(
    14.18 * scale + offsetX,
    4.19 * scale + PADDING,
    13.57 * scale + offsetX,
    4.6 * scale + PADDING,
    13.06 * scale + offsetX,
    5.11 * scale + PADDING
  )

  // Center dip
  path.lineTo(12 * scale + offsetX, 6.17 * scale + PADDING)
  path.lineTo(10.94 * scale + offsetX, 5.11 * scale + PADDING)

  // Right side of heart
  path.cubicTo(
    9.91 * scale + offsetX,
    4.08 * scale + PADDING,
    8.51 * scale + offsetX,
    3.5 * scale + PADDING,
    7.05 * scale + offsetX,
    3.5 * scale + PADDING
  )
  path.cubicTo(
    5.59 * scale + offsetX,
    3.5 * scale + PADDING,
    4.19 * scale + offsetX,
    4.08 * scale + PADDING,
    3.16 * scale + offsetX,
    5.11 * scale + PADDING
  )
  path.cubicTo(
    2.13 * scale + offsetX,
    6.14 * scale + PADDING,
    1.55 * scale + offsetX,
    7.54 * scale + PADDING,
    1.55 * scale + offsetX,
    9 * scale + PADDING
  )
  path.cubicTo(
    1.55 * scale + offsetX,
    10.46 * scale + PADDING,
    2.13 * scale + offsetX,
    11.86 * scale + PADDING,
    3.16 * scale + offsetX,
    12.89 * scale + PADDING
  )

  // Bottom point and back up
  path.lineTo(4.22 * scale + offsetX, 13.95 * scale + PADDING)
  path.lineTo(12 * scale + offsetX, 21.73 * scale + PADDING)
  path.lineTo(19.78 * scale + offsetX, 13.95 * scale + PADDING)
  path.lineTo(20.84 * scale + offsetX, 12.89 * scale + PADDING)

  // Add the missing right curve
  path.cubicTo(
    21.87 * scale + offsetX,
    11.86 * scale + PADDING,
    22.45 * scale + offsetX,
    10.46 * scale + PADDING,
    22.45 * scale + offsetX,
    9 * scale + PADDING
  )
  path.cubicTo(
    22.45 * scale + offsetX,
    7.54 * scale + PADDING,
    21.87 * scale + offsetX,
    6.14 * scale + PADDING,
    20.84 * scale + offsetX,
    5.11 * scale + PADDING
  )

  // Close the path
  path.close()

  return (
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} style="fill" color="white" />
    </Canvas>
  )
}
