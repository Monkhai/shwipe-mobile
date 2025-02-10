import { colors } from '@/constants/colors'
import { User } from '@/queries/users/userTypes'
import { Portal } from '@gorhom/portal'
import { Canvas, FitBox, Path } from '@shopify/react-native-skia'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { FlatList, Image, Platform, Pressable, useColorScheme, useWindowDimensions, View } from 'react-native'
import Animated, { LinearTransition, SlideInRight, SlideOutRight, StyleProps, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import UIText from '../../UIText'
import { GeneralButton } from '../TextButtons'

const size = 32
function MenuIcon() {
  const theme = useColorScheme() ?? 'light'
  return (
    <Canvas style={{ width: size, height: size }}>
      <FitBox src={{ x: 0, y: 0, width: 40, height: 40 }} dst={{ x: 0, y: 0, width: size, height: size }}>
        <Path
          path="M27.3672 21.7012C28.3926 21.7012 29.2227 20.8809 29.2227 19.8555C29.2227 18.8301 28.3926 18 27.3672 18C26.3418 18 25.5117 18.8301 25.5117 19.8555C25.5117 20.8809 26.3418 21.7012 27.3672 21.7012Z"
          color={colors[theme].definedMaterial}
        />
        <Path
          path="M20.1113 21.7012C21.1367 21.7012 21.957 20.8809 21.957 19.8555C21.957 18.8301 21.1367 18 20.1113 18C19.0859 18 18.2559 18.8301 18.2559 19.8555C18.2559 20.8809 19.0859 21.7012 20.1113 21.7012Z"
          color={colors[theme].definedMaterial}
        />
        <Path
          path="M12.8555 21.7012C13.8809 21.7012 14.7012 20.8809 14.7012 19.8555C14.7012 18.8301 13.8809 18 12.8555 18C11.8301 18 11 18.8301 11 19.8555C11 20.8809 11.8301 21.7012 12.8555 21.7012Z"
          color={colors[theme].definedMaterial}
        />
      </FitBox>
    </Canvas>
  )
}

export default function MenuButton() {
  const theme = useColorScheme() ?? 'light'
  const [showMenu, setShowMenu] = useState(false)
  return (
    <Animated.View exiting={SlideOutRight} entering={SlideInRight}>
      <GeneralButton
        layout={LinearTransition}
        onPress={() => setShowMenu(!showMenu)}
        hitSlop={24}
        style={{ borderRadius: 100, backgroundColor: colors[theme].material }}
      >
        <MenuIcon />
      </GeneralButton>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
    </Animated.View>
  )
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => ({
  display_name: `User ${i}`,
  photo_url: `https://picsum.photos/200/300?random=${i}`,
  id: String(i),
}))

export function Menu({ setShowMenu }: { setShowMenu: (show: boolean) => void }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const width = windowWidth * 0.6
  const insets = useSafeAreaInsets()

  return (
    <Portal>
      <Pressable
        style={{ position: 'absolute', width: windowWidth, height: windowHeight, zIndex: 99999, backgroundColor: 'transparent' }}
        onPress={() => setShowMenu(false)}
      />

      <AnimatedBlurView
        entering={EnterAnimation}
        tint={'dark'}
        experimentalBlurMethod={Platform.select({ android: 'dimezisBlurView', default: 'none' })}
        exiting={ExitAnimation}
        style={{
          zIndex: 99999,
          position: 'absolute',
          top: 72 + insets.top,
          right: 32,
          overflow: 'hidden',
          width,
          borderRadius: 24,
          backgroundColor: colors.dark.definedMaterial,
        }}
      >
        <FlatList
          style={{ height: 180 }}
          ListHeaderComponent={() => {
            return (
              <View style={{ padding: 16 }}>
                <UIText type="calloutEmphasized" color="white">
                  Session Users
                </UIText>
              </View>
            )
          }}
          data={mockUsers}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item: user }) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 }}>
                <Image source={{ uri: user.photo_url }} style={{ width: 32, height: 32, borderRadius: 16 }} />
                <UIText color="white" type="calloutEmphasized">
                  {user.display_name}
                </UIText>
              </View>
            )
          }}
        />
      </AnimatedBlurView>
    </Portal>
  )
}

type LayoutAnimation = {
  initialValues: StyleProps
  animations: StyleProps
  callback?: (finished: boolean) => void
}

type ExitAnimationsValues = CurrentLayoutAnimationsValues & WindowDimensions
type EntryAnimationsValues = TargetLayoutAnimationsValues & WindowDimensions

type TargetLayoutAnimationsValues = {
  targetOriginX: number
  targetOriginY: number
  targetWidth: number
  targetHeight: number
  targetBorderRadius: number
  targetGlobalOriginX: number
  targetGlobalOriginY: number
}

type CurrentLayoutAnimationsValues = {
  currentOriginX: number
  currentOriginY: number
  currentWidth: number
  currentHeight: number
  currentBorderRadius: number
  currentGlobalOriginX: number
  currentGlobalOriginY: number
}

interface WindowDimensions {
  windowWidth: number
  windowHeight: number
}

function EnterAnimation(values: EntryAnimationsValues): LayoutAnimation {
  'worklet'
  const initialValues: StyleProps = {
    height: 0,
    width: 0,
    transform: [{ translateX: values.targetWidth }, { scale: 0 }],
  }

  const animations: StyleProps = {
    height: withTiming(values.targetHeight),
    width: withTiming(values.targetWidth),
    transform: [{ translateX: withTiming(0) }, { scale: withTiming(1) }],
  }
  return { initialValues, animations }
}

function ExitAnimation(values: ExitAnimationsValues): LayoutAnimation {
  'worklet'
  const initialValues: StyleProps = {
    height: values.currentHeight,
    width: values.currentWidth,
    transform: [{ translateX: 0 }, { scale: 1 }],
  }
  const animations: StyleProps = {
    height: withTiming(0),
    width: withTiming(0),
    transform: [{ translateX: withTiming(values.currentWidth) }, { scale: withTiming(0) }],
  }
  return { initialValues, animations }
}
