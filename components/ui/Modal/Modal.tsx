import { Portal } from '@gorhom/portal'
import React, { useImperativeHandle, useState } from 'react'
import { Keyboard, StyleSheet, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Animated, {
  clamp,
  FadeIn,
  runOnJS,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export interface ModalRef {
  open: () => void
  close: () => void
  toggle: () => void
}

interface ModalProps {
  children?: React.ReactNode
}

const Modal = React.forwardRef<ModalRef, ModalProps>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const { height } = useReanimatedKeyboardAnimation()
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const actualOriginY = useSharedValue(0)
  const backdropOpacity = useSharedValue(1)

  const modalHeight = windowHeight * 0.35

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdropOpacity.value }))

  const modalStyle = useAnimatedStyle(() => {
    const translateY = height.value + actualOriginY.value
    return {
      transform: [{ translateY }],
    }
  })

  function close() {
    setIsOpen(false)
  }

  function open() {
    setIsOpen(true)
  }

  function toggle() {
    setIsOpen(prev => !prev)
  }

  function handleClose() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss()
      backdropOpacity.value = withTiming(1)
      actualOriginY.value = withTiming(0)
    } else {
      actualOriginY.value = withTiming(0)
      backdropOpacity.value = withTiming(1)
      close()
    }
  }

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
      toggle,
    }
  })

  function Entering(_: TargetLayoutAnimationsValues): LayoutAnimation {
    'worklet'
    return {
      initialValues: {
        transform: [{ translateY: modalHeight }],
      },
      animations: {
        transform: [{ translateY: withSpring(0) }],
      },
    }
  }

  function Exiting(_: CurrentLayoutAnimationsValues): LayoutAnimation {
    'worklet'
    return {
      initialValues: {
        transform: [{ translateY: actualOriginY.value }],
      },
      animations: {
        transform: [{ translateY: withTiming(modalHeight) }],
      },
    }
  }

  function ExitingBackdrop(_: CurrentLayoutAnimationsValues): LayoutAnimation {
    'worklet'
    return {
      initialValues: {
        opacity: backdropOpacity.value,
      },
      animations: {
        opacity: withTiming(0),
      },
    }
  }

  const pan = Gesture.Pan()
    .onChange(e => {
      if (e.translationY < 0) {
        const scale = 30
        actualOriginY.value = -scale * (Math.log(Math.abs(e.translationY) + scale) - Math.log(scale))
      } else {
        actualOriginY.value = e.translationY
      }

      const normalizedPostition = e.translationY / modalHeight
      backdropOpacity.value = 1 - normalizedPostition
    })
    .onEnd(() => {
      if (actualOriginY.value > modalHeight / 6) {
        runOnJS(handleClose)()
      } else {
        actualOriginY.value = withTiming(0)
        backdropOpacity.value = withTiming(1)
      }
    })

  if (!isOpen) return null

  return (
    <Portal>
      <Animated.View onTouchStart={handleClose} style={StyleSheet.absoluteFill} entering={FadeIn} exiting={ExitingBackdrop}>
        <Animated.View style={[StyleSheet.absoluteFillObject, backdropStyle, { backgroundColor: '#00000050' }]} />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View
          entering={Entering}
          exiting={Exiting}
          style={[
            styles.modalBase,
            modalStyle,
            {
              width: windowWidth * 0.95,
              marginHorizontal: windowWidth * 0.025,
              marginBottom: windowWidth * 0.025,
            },
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </Portal>
  )
})

export default Modal

const styles = StyleSheet.create({
  modalBase: {
    position: 'absolute',
    bottom: 0,
    height: '35%',
  },
})

type LayoutAnimation = {
  initialValues: StyleProps
  animations: StyleProps
  callback?: (finished: boolean) => void
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

type TargetLayoutAnimationsValues = {
  targetOriginX: number
  targetOriginY: number
  targetWidth: number
  targetHeight: number
  targetBorderRadius: number
  targetGlobalOriginX: number
  targetGlobalOriginY: number
}

interface WindowDimensions {
  windowWidth: number
  windowHeight: number
}
