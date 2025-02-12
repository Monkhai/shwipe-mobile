import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import Skeleton from '@/components/ui/Skeleton'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Image, useColorScheme, useWindowDimensions, View } from 'react-native'

interface FeaturedRestaurantProps {
  image: string
  name: string
  cuisine: string
  rating: string
}

export default function FeaturedRestaurant({ image, name, cuisine, rating }: FeaturedRestaurantProps) {
  const theme = useColorScheme() ?? 'light'
  const { width: screenWidth } = useWindowDimensions()
  const cardWidth = (screenWidth - 48) / 2 // 16px padding on each side and 16px gap between cards
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <GeneralButton
      style={{
        width: cardWidth,
        aspectRatio: 1,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors[theme].material,
      }}
    >
      <View style={{ flex: 1 }}>
        <Skeleton width={cardWidth} height={cardWidth} />
        <Image
          onLoadEnd={() => setIsLoaded(true)}
          source={{ uri: image }}
          style={{ width: '100%', height: '70%', flex: 1, opacity: isLoaded ? 1 : 0 }}
        />
      </View>
      <View style={{ padding: 12, gap: 4, justifyContent: 'space-between' }}>
        <UIText type="callout" color="white">
          {name}
        </UIText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <UIText type="caption" color="secondaryLabel">
            {cuisine}
          </UIText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="star" size={12} color={colors[theme].warning} />
            <UIText type="caption" color="secondaryLabel">
              {rating}
            </UIText>
          </View>
        </View>
      </View>
    </GeneralButton>
  )
}
