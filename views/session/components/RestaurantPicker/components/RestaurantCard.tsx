import Heart from '@/components/shapes/Heart'
import X from '@/components/shapes/X'
import { cardBorderColors } from '@/constants/colors'
import { ClientMessageType, UpdateIndexMessage } from '@/wsHandler/clientMessagesTypes'
import { UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import { useSessionStore } from '@/zustand/sessionStore'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { forwardRef, useImperativeHandle } from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  clamp,
  interpolate,
  interpolateColor,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const ROTATION_THRESHOLD = 45

export type RestaurantCardRef = {
  like: () => void
  dislike: () => void
}

type CardProps = { index: number; restaurant: Restaurant; updateIndex: () => void }

const RestaurantCard = forwardRef<RestaurantCardRef, CardProps>(({ index, restaurant, updateIndex }, ref) => {
  const { sessionId, restaurants } = useSessionStore()
  const { sendMessage } = useWebsocketStore()
  const { width } = useWindowDimensions()
  const rotation = useSharedValue(0)
  const translationX = useSharedValue(0)
  const heartTranslationX = useSharedValue(0)
  const xTranslationX = useSharedValue(0)
  const heartOpacity = useSharedValue(0)
  const xOpacity = useSharedValue(0)

  const realIndex = (restaurants ?? []).length - index - 1

  function dislike() {
    if (!sessionId) return
    rotation.value = withTiming(-ROTATION_THRESHOLD)
    translationX.value = withTiming(-width * 2)
    const updateIndexMessage: UnsignedBaseClientMessage<UpdateIndexMessage> = {
      type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE,
      index: realIndex,
      session_id: sessionId,
      liked: false,
    }
    sendMessage(updateIndexMessage)
    updateIndex()
  }

  function like() {
    if (!sessionId) return
    rotation.value = withTiming(ROTATION_THRESHOLD)
    translationX.value = withTiming(width * 2)
    const updateIndexMessage: UnsignedBaseClientMessage<UpdateIndexMessage> = {
      type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE,
      index: realIndex,
      session_id: sessionId,
      liked: true,
    }
    sendMessage(updateIndexMessage)
    updateIndex()
  }

  useImperativeHandle(ref, () => {
    return {
      dislike,
      like,
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    const rotationPercentage = Math.abs(rotation.value) / ROTATION_THRESHOLD
    return {
      borderWidth: 7,
      borderColor:
        rotation.value < 0
          ? interpolateColor(rotationPercentage, [0.1, 0.5, 1], cardBorderColors.red)
          : interpolateColor(rotationPercentage, [0.1, 0.5, 1], cardBorderColors.green),
      borderRadius: 20,
      shadowColor:
        rotation.value < 0
          ? interpolateColor(rotationPercentage, [0.1, 0.5, 1], cardBorderColors.red)
          : interpolateColor(rotationPercentage, [0.1, 0.5, 1], cardBorderColors.green),
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 20,
      transform: [{ translateX: translationX.value }, { rotate: `${rotation.value}deg` }],
    }
  })

  const pan = Gesture.Pan()
    .onUpdate(e => {
      rotation.value = (e.translationX / width) * ROTATION_THRESHOLD
      translationX.value = e.translationX

      const heartX = clamp(-translationX.value * 1.1, -width / 2, 0)
      heartTranslationX.value = heartX
      heartOpacity.value = interpolate(heartX, [-width / 5, 0], [1, 0])

      const xX = clamp(-translationX.value * 1.1, 0, width / 2)
      xTranslationX.value = xX
      xOpacity.value = interpolate(xX, [width / 5, 0], [1, 0])
    })
    .onEnd(() => {
      if (Math.abs(translationX.value) > width * 0.3) {
        if (translationX.value > 0) {
          runOnJS(like)()
        } else {
          runOnJS(dislike)()
        }
      } else {
        rotation.value = withTiming(0)
        translationX.value = withTiming(0)
        heartTranslationX.value = withTiming(0)
        xTranslationX.value = withTiming(0)
        heartOpacity.value = withTiming(0)
        xOpacity.value = withTiming(0)
      }
    })

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: heartTranslationX.value }, { scale: clamp(heartOpacity.value, 0, 1) }],
      opacity: heartOpacity.value,
    }
  })
  const xAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xTranslationX.value }, { scale: clamp(xOpacity.value, 0, 1) }],
      opacity: xOpacity.value,
    }
  })

  const link = `${restaurant.photos[0]}`
  return (
    <GestureDetector gesture={pan}>
      <Animated.View layout={LinearTransition} style={[animatedStyle, styles.imageContainer]}>
        <Animated.Image layout={LinearTransition} key={index} source={{ uri: link }} style={styles.image} />
        <Animated.View layout={LinearTransition} style={[heartAnimatedStyle, styles.shape, { left: width / 2 }]}>
          <Heart size={100} />
        </Animated.View>
        <Animated.View style={[xAnimatedStyle, styles.shape, { right: width / 2 }]}>
          <X size={100} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
})

export default RestaurantCard

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 32,
    borderWidth: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  shape: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
