import NewHeart from '@/components/shapes/NewHeart'
import { WhiteX } from '@/components/shapes/X'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { BlurView } from 'expo-blur'
import React, { MutableRefObject } from 'react'
import { StyleSheet, View } from 'react-native'
import { RestaurantCardRef } from './RestaurantCard'

interface Props {
  restaurant: Restaurant
  cardRefs: MutableRefObject<RestaurantCardRef[]>
  restaurantIndex: number
}

export default function RestaurantCardFooter({ cardRefs, restaurantIndex }: Props) {
  return (
    <View style={styles.container}>
      <DislikeButton cardRefs={cardRefs} restaurantIndex={restaurantIndex} />
      <LikeButton cardRefs={cardRefs} restaurantIndex={restaurantIndex} />
    </View>
  )
}

function LikeButton({ cardRefs, restaurantIndex }: { cardRefs: MutableRefObject<RestaurantCardRef[]>; restaurantIndex: number }) {
  return (
    <GeneralButton
      onPress={() => {
        const card = cardRefs.current[restaurantIndex]
        if (card) {
          card.like()
        } else {
          console.log('no card')
        }
      }}
      style={{
        backgroundColor: colors.light.success,
        ...styles.button,
      }}
    >
      <BlurView intensity={40} style={{ flex: 1, overflow: 'hidden', ...styles.button }}>
        <NewHeart />
      </BlurView>
    </GeneralButton>
  )
}

function DislikeButton({ cardRefs, restaurantIndex }: { cardRefs: MutableRefObject<RestaurantCardRef[]>; restaurantIndex: number }) {
  return (
    <GeneralButton
      onPress={() => {
        const card = cardRefs.current[restaurantIndex]
        if (card) {
          card.dislike()
        } else {
          console.log('no card')
        }
      }}
      style={{
        backgroundColor: colors.light.danger,
        ...styles.button,
      }}
    >
      <BlurView intensity={40} style={{ flex: 1, overflow: 'hidden', ...styles.button }}>
        <WhiteX size={44} />
      </BlurView>
    </GeneralButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  detailsContainer: {
    borderRadius: 32,
    padding: 16,
  },
  button: {
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
