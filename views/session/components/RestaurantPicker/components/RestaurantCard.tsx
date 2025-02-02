import { ClientMessageType, UpdateIndexMessage } from '@/wsHandler/clientMessagesTypes'
import { UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { useSessionStore } from '@/zustand/sessionStore'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { forwardRef, useImperativeHandle } from 'react'
import { Image, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

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
  const realIndex = (restaurants ?? []).length - index - 1

  function dislike() {
    if (!sessionId) return
    rotation.value = withTiming(-ROTATION_THRESHOLD)
    translationX.value = withTiming(-width * 2)
    const updateIndexMessage: UnsignedBaseClientMessage<UpdateIndexMessage> = {
      type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE,
      index: realIndex + 1,
      session_id: sessionId,
    }
    sendMessage(updateIndexMessage)
    console.log('sent update index message', realIndex + 1)
    updateIndex()
  }

  function like() {
    if (!sessionId) return
    rotation.value = withTiming(ROTATION_THRESHOLD)
    translationX.value = withTiming(width * 2)
    const updateIndexMessage: UnsignedBaseClientMessage<UpdateIndexMessage> = {
      type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE,
      index: realIndex + 1,
      session_id: sessionId,
    }
    sendMessage(updateIndexMessage)
    console.log('sent update index message', realIndex + 1)
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
          ? interpolateColor(rotationPercentage, [0.1, 0.5, 1], ['#FF3B3000', '#FF3B30', '#FF0000'])
          : interpolateColor(rotationPercentage, [0.1, 0.5, 1], ['#34C75900', '#34C759', '#00FF00']),
      borderRadius: 20,
      shadowColor:
        rotation.value < 0
          ? interpolateColor(rotationPercentage, [0.1, 0.5, 1], ['#FF3B3000', '#FF3B30', '#FF0000'])
          : interpolateColor(rotationPercentage, [0.1, 0.5, 1], ['#34C75900', '#34C759', '#00FF00']),
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
      }
    })
  const link = `${restaurant.photos[0]}&key=AIzaSyALFutkrFeGGS8jR_HVgO1xUqrlJ-_ZZm4`
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyle, { position: 'absolute', width: '100%', height: '100%' }]}>
        <Image key={index} source={{ uri: link }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
      </Animated.View>
    </GestureDetector>
  )
})

export default RestaurantCard
