import { colors } from '@/constants/colors'
import { Canvas, FitBox, Path } from '@shopify/react-native-skia'
import { useColorScheme } from 'react-native'
import { GeneralButton } from '../TextButtons'
import { router } from 'expo-router'
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  FadeOut,
  LinearTransition,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
} from 'react-native-reanimated'
import { ReanimatedKeyframe } from 'react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/Keyframe'
import { BlurView } from 'expo-blur'

const size = 32
function BackArrow() {
  const theme = useColorScheme() ?? 'light'
  return (
    <Canvas style={{ width: size, height: size }}>
      <FitBox src={{ x: 0, y: 0, width: 40, height: 40 }} dst={{ x: 0, y: 0, width: size, height: size }}>
        <Path
          path="M12 20.4439C12 20.7575 12.0924 21.0398 12.416 21.3533L17.2999 26.5272C17.5311 26.7624 17.793 26.8878 18.1165 26.8878C18.7482 26.8878 19.195 26.4175 19.195 25.7589C19.195 25.4611 19.0717 25.1161 18.8252 24.8966L16.3293 22.5134L15.3741 21.5885L17.6851 21.6826H26.3438C26.9908 21.6826 27.5455 21.1181 27.5455 20.4439C27.5455 19.7697 26.9908 19.1896 26.3438 19.1896H17.6851L15.3741 19.2994L16.3293 18.3743L18.8252 15.9912C19.0717 15.7717 19.195 15.4424 19.195 15.1445C19.195 14.486 18.7482 14 18.1165 14C17.793 14 17.5311 14.1254 17.2999 14.3606L12.416 19.5346C12.0924 19.8481 12 20.1147 12 20.4439Z"
          color={'white'}
        />
      </FitBox>
    </Canvas>
  )
}

type EntryExitTransition = BaseAnimationBuilder | EntryExitAnimationFunction | ReanimatedKeyframe
interface Props {
  entering?: EntryExitTransition
  exiting?: EntryExitTransition
}
export default function BackButton({ entering = ZoomIn, exiting = FadeOut }: Props) {
  const theme = useColorScheme() ?? 'light'
  return (
    <Animated.View layout={LinearTransition} entering={entering} exiting={exiting}>
      <GeneralButton onPress={router.back} hitSlop={24} style={{ borderRadius: 100, backgroundColor: colors[theme].material }}>
        <BackArrow />
      </GeneralButton>
    </Animated.View>
  )
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export function BackButtonBlur({ entering = ZoomIn, exiting = FadeOut, tint = undefined }: Props & { tint?: 'dark' | 'light' }) {
  const theme = useColorScheme() ?? 'light'
  return (
    <AnimatedBlurView
      intensity={80}
      tint={tint}
      experimentalBlurMethod="dimezisBlurView"
      layout={LinearTransition}
      entering={entering}
      exiting={exiting}
      style={{ overflow: 'hidden', borderRadius: 100, padding: 4, backgroundColor: colors[theme].thickMaterial }}
    >
      <GeneralButton onPress={router.back} hitSlop={24} style={{ borderRadius: 100 }}>
        <BackArrow />
      </GeneralButton>
    </AnimatedBlurView>
  )
}
