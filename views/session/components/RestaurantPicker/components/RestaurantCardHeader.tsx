import RestaurantInfoPills from '@/components/restaurants/RestaurantInfoPills'
import { AnimatedPressable } from '@/components/ui/buttons/AnimatedPressable'
import BackButton from '@/components/ui/buttons/icon-buttons/BackButton'
import MenuButton from '@/components/ui/buttons/icon-buttons/MenuButton'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import React, { useRef, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { LinearTransition, SlideInRight, SlideOutRight } from 'react-native-reanimated'

interface Props {
  restaurant: Restaurant
}
export default function RestaurantCardHeader({ restaurant }: Props) {
  const theme = useColorScheme() ?? 'light'
  const [showMore, setShowMore] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  return (
    <Animated.View
      layout={LinearTransition}
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}
    >
      {!showMore && <BackButton />}
      <Animated.View layout={LinearTransition} style={[styles.detailsContainer, { backgroundColor: colors[theme].material }]}>
        <RestaurantDetails restaurant={restaurant} showMore={showMore} setShowMore={setShowMore} timerRef={timerRef} />
      </Animated.View>
      {!showMore && <MenuButton />}
    </Animated.View>
  )
}

function RestaurantDetails({
  restaurant,
  showMore,
  setShowMore,
  timerRef,
}: {
  restaurant: Restaurant
  showMore: boolean
  setShowMore: (showMore: boolean) => void
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>
}) {
  return (
    <AnimatedPressable
      layout={LinearTransition}
      onPress={() => {
        if (showMore) {
          if (timerRef.current) {
            clearTimeout(timerRef.current)
          }
          setShowMore(false)
        } else {
          setShowMore(true)
          timerRef.current = setTimeout(() => setShowMore(false), 3000)
        }
      }}
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}
    >
      <UIText numberOfLines={showMore ? undefined : 1} type="calloutEmphasized" color="white" style={{ flex: 1 }}>
        {restaurant.name}
      </UIText>
      {!showMore && (
        <Animated.View exiting={SlideOutRight} entering={SlideInRight}>
          <RestaurantInfoPills restaurant={restaurant} condensed />
        </Animated.View>
      )}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    borderRadius: 32,
    padding: 16,
    paddingVertical: 8,
    borderWidth: 6,
    borderColor: 'transparent',
  },
})
