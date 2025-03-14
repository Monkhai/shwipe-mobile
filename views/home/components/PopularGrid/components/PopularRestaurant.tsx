import { GeneralButton } from '@/components/ui/buttons/Buttons'
import Skeleton from '@/components/ui/Skeleton'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Restaurant, RestaurantDetails } from '@/queries/restaurants/restaurantTypes'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import { useState } from 'react'
import { Image, useColorScheme, useWindowDimensions, View } from 'react-native'

interface FeaturedRestaurantProps {
  restaurant: RestaurantDetails
}

export default function FeaturedRestaurant({ restaurant }: FeaturedRestaurantProps) {
  const theme = useColorScheme() ?? 'light'
  const { width: screenWidth } = useWindowDimensions()
  const cardSize = (screenWidth - 48) / 2 // 16px padding on each side and 16px gap between cards
  const [isLoaded, setIsLoaded] = useState(false)

  const placeId = restaurant.place_id!
  return (
    <View>
      <GeneralButton
        onPress={() => router.push(`/(auth)/restaurant/${placeId}`)}
        style={{
          width: cardSize,
          height: cardSize,
          aspectRatio: 1,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: colors[theme].material,
        }}
      >
        <View style={{ flex: 1 }}>
          {!isLoaded && <Skeleton width={cardSize} height={cardSize} />}
          <Image
            onLoadEnd={() => setIsLoaded(true)}
            source={{ uri: restaurant.photo_urls[0] }}
            style={{ width: '100%', height: '70%', flex: 1, opacity: isLoaded ? 1 : 0 }}
          />
        </View>
        <View style={{ padding: 12, gap: 4, justifyContent: 'space-between' }}>
          <UIText type="callout" color="white" numberOfLines={1}>
            {restaurant.name}
          </UIText>
          <View style={{ gap: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <UIText type="caption" style={{ flex: 1 }} color="secondaryLabel" numberOfLines={1}>
              {restaurant.vicinity}
            </UIText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="star" size={12} color={colors[theme].warning} />
              <UIText type="caption" color="secondaryLabel">
                {restaurant.rating}
              </UIText>
            </View>
          </View>
        </View>
      </GeneralButton>
    </View>
  )
}

export function PopularRestaurantSkeleton() {
  const { width: screenWidth } = useWindowDimensions()
  const cardWidth = (screenWidth - 48) / 2 // 16px padding on each side and 16px gap between cards
  return (
    <View style={{ width: cardWidth, aspectRatio: 1, borderRadius: 16, overflow: 'hidden' }}>
      <Skeleton width={cardWidth} height={cardWidth} />
    </View>
  )
}
