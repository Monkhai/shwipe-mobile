import AppleMapsLogo from '@/components/logos/AppleMapsLogo'
import GoogleMapsLogo from '@/components/logos/GoogleMapsLogo'
import WazeLogo from '@/components/logos/WazeLogo'
import RestaurantInfoPills from '@/components/restaurants/RestaurantInfoPills'
import Skeleton from '@/components/ui/Skeleton'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import BackButton, { BackButtonBlur } from '@/components/ui/buttons/icon-buttons/BackButton'
import { colors } from '@/constants/colors'
import { RestaurantDetails } from '@/queries/restaurants/restaurantTypes'
import { Ionicons } from '@expo/vector-icons'
import { Canvas, LinearGradient, Path } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Image, Linking, Platform, ScrollView, StyleSheet, useColorScheme, useWindowDimensions, View } from 'react-native'
import Animated, { FadeIn, LinearTransition, SlideInLeft, SlideOutLeft } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  restaurant: RestaurantDetails
  hideBackButton?: boolean
}
export default function RestaurantDetailsViewUI({ restaurant, hideBackButton = false }: Props) {
  const { width: screenWidth } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const theme = useColorScheme() ?? 'light'
  const [imageLoaded, setImageLoaded] = useState(false)
  const HEADER_HEIGHT = 250

  const reviews =
    restaurant.reviews
      ?.sort((a, b) => Number(b.time) - Number(a.time))
      .map(review => {
        return {
          ...review,
          time: format(new Date(Number(review.time) * 1000), 'MMM d, yyyy'),
        }
      }) ?? []

  return (
    <UIView>
      <View
        style={{
          height: HEADER_HEIGHT,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Skeleton height={HEADER_HEIGHT} width={screenWidth} />
        <Image
          source={{ uri: restaurant.photo_urls[0] }}
          style={{ width: '100%', height: '100%', bottom: 0, left: 0, position: 'absolute', opacity: imageLoaded ? 1 : 0 }}
          onLoadEnd={() => setImageLoaded(true)}
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            entering={FadeIn}
            style={{
              padding: 20,
              gap: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {!hideBackButton && <BackButtonBlur tint="dark" />}
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={80}
              tint="dark"
              style={{ borderRadius: 16, padding: 16, flex: 1, overflow: 'hidden' }}
            >
              <UIText numberOfLines={2} type="titleEmphasized" color="white" style={{ marginBottom: 8 }}>
                {restaurant.name}
              </UIText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <UIText type="callout" style={{ flex: 1, color: colors.dark.secondaryLabel }}>
                  {restaurant.vicinity}
                </UIText>
              </View>
              <RestaurantInfoPills rating={restaurant.rating!} priceLevel={restaurant.price_level!} />
            </BlurView>
          </Animated.View>
        </View>
      </View>

      <ScrollView
        nestedScrollEnabled
        bounces={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 24 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="star" size={24} color={colors[theme].warning} />
          <UIText type="titleEmphasized" color="label">
            {restaurant.rating}
          </UIText>
          <UIText type="callout" color="secondaryLabel">
            ({restaurant.user_ratings_total} reviews)
          </UIText>
        </View>

        <ActionButtons restaurant={restaurant} />

        {restaurant.opening_hours?.weekday_text && (
          <View style={{ gap: 16 }}>
            <UIText type="secondaryTitleEmphasized" color="label">
              Opening Hours
            </UIText>
            <View style={{ gap: 8 }}>
              {restaurant.opening_hours.weekday_text.map((hours, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <UIText type="calloutEmphasized" color="secondaryLabel">
                    {hours.split(' ')[0]}
                  </UIText>
                  <UIText type="callout" color="secondaryLabel">
                    {hours.split(' ')[1]}
                  </UIText>
                </View>
              ))}
            </View>
          </View>
        )}

        {restaurant.reviews && restaurant.reviews.length > 0 && (
          <View style={{ gap: 16 }}>
            <UIText type="secondaryTitleEmphasized" color="label">
              Reviews
            </UIText>
            <View style={{ gap: 12 }}>
              {reviews.map((review, i) => (
                <View key={i} style={{ gap: 4, padding: 16, borderRadius: 16, backgroundColor: colors[theme].thinMaterial }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    <UIText type="calloutEmphasized" color="label">
                      {review.author_name}
                    </UIText>
                    <UIText type="footnote" color="secondaryLabel">
                      {review.time}
                    </UIText>
                  </View>
                  <UIText type="callout" color="secondaryLabel">
                    {review.text}
                  </UIText>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </UIView>
  )
}

function ActionButtons({ restaurant }: { restaurant: RestaurantDetails }) {
  const theme = useColorScheme() ?? 'light'
  const navigationLinks = restaurant.navigation_links
  return (
    <View style={styles.navigationButtons}>
      {restaurant.formatted_phone_number && (
        <GeneralButton
          onPress={() => Linking.openURL(`tel:${restaurant.formatted_phone_number}`)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            backgroundColor: colors[theme].primary + '4D',
            height: 48,
            width: 48,
          }}
        >
          <Ionicons name="call" size={24} color={colors[theme].primary} />
        </GeneralButton>
      )}

      {restaurant.website && (
        <GeneralButton
          onPress={() => Linking.openURL(restaurant.website!)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            backgroundColor: colors[theme].primary + '4D',
            height: 48,
            width: 48,
          }}
        >
          <Ionicons name="globe" size={24} color={colors[theme].primary} />
        </GeneralButton>
      )}

      <GeneralButton
        onPress={() => {
          console.log('navigationLinks.waze', navigationLinks.waze)
          Linking.openURL(navigationLinks.waze)
        }}
        style={[styles.mapButton, styles.wazeButton]}
      >
        <WazeLogo />
      </GeneralButton>
      <GeneralButton
        onPress={() => {
          Linking.openURL(navigationLinks.google_maps)
        }}
        style={[styles.mapButton, styles.googleMapsButton]}
      >
        <GoogleMapsLogo />
      </GeneralButton>

      {Platform.OS === 'ios' ? (
        <GeneralButton
          onPress={() => {
            Linking.openURL(navigationLinks.apple_maps)
          }}
          style={[styles.mapButton, styles.appleMapsButton]}
        >
          <AppleMapsLogo />
        </GeneralButton>
      ) : null}
    </View>
  )
}

function BackArrow() {
  return (
    <Canvas style={{ width: 40, height: 40 }}>
      <Path path="M34.4656 19.9927C34.4656 28.2533 27.8647 34.9854 19.7328 34.9854C11.6153 34.9854 5 28.2533 5 19.9927C5 11.7173 11.6153 5 19.7328 5C27.8647 5 34.4656 11.7173 34.4656 19.9927ZM17.364 14.0985L12.6264 19.0961C12.3231 19.4047 12.222 19.6546 12.222 19.978C12.222 20.2866 12.3231 20.5512 12.6264 20.8599L17.364 25.8574C17.5806 26.0927 17.8262 26.2102 18.144 26.2102C18.7506 26.2102 19.1984 25.7546 19.1984 25.1225C19.1984 24.8285 19.0828 24.4905 18.8373 24.2847L16.4251 21.977L15.5007 21.0951L17.7395 21.1833H26.0881C26.7236 21.1833 27.258 20.6394 27.258 19.978C27.258 19.3165 26.7236 18.758 26.0881 18.758H17.7395L15.5152 18.8609L16.4251 17.979L18.8373 15.6713C19.0828 15.4655 19.1984 15.1421 19.1984 14.8481C19.1984 14.2161 18.7506 13.7457 18.144 13.7457C17.8262 13.7457 17.5806 13.8633 17.364 14.0985Z">
        <LinearGradient start={{ x: 40, y: 0 }} end={{ x: 0, y: 0 }} colors={['#FFFFFF66', '#FFFFFF80']} />
      </Path>
    </Canvas>
  )
}
const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  mapButton: {
    overflow: 'hidden',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wazeButton: {
    backgroundColor: '#01CDFF',
  },
  googleMapsButton: {
    backgroundColor: '#fff',
  },
  appleMapsButton: {
    backgroundColor: '#fff',
  },
})
