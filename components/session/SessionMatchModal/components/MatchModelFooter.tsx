import AppleMapsLogo from '@/components/logos/AppleMapsLogo'
import GoogleMapsLogo from '@/components/logos/GoogleMapsLogo'
import WazeLogo from '@/components/logos/WazeLogo'
import RestaurantInfoPills from '@/components/restaurants/RestaurantInfoPills'
import { GeneralButton, PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { NavigationLinks, Restaurant } from '@/queries/restaurants/restaurantTypes'
import { Canvas, LinearGradient, Path } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { Linking, Platform, StyleSheet, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated'

interface Props {
  restaurant: Restaurant
  onDismiss: () => void
}

export default function MatchModelFooter({ restaurant, onDismiss }: Props) {
  const [menuType, setMenuType] = useState<'restaurant' | 'navigation'>('restaurant')

  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInDown.springify().mass(1).damping(16).stiffness(120)}
      exiting={SlideOutDown}
      style={{
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: colors.baseMaterial,
        width: '90%',
        borderRadius: 32,
        padding: 16,
        marginBottom: 32,
      }}
    >
      {menuType === 'restaurant' ? <RestaurantDetails restaurant={restaurant} /> : null}

      <Animated.View layout={LinearTransition} style={{ flexDirection: 'row', gap: 16 }}>
        {menuType === 'navigation' ? (
          <NavigationMenu onBack={() => setMenuType('restaurant')} navigationLinks={restaurant.navigation_links} />
        ) : (
          <MainMenu setMenuType={setMenuType} onDismiss={onDismiss} />
        )}
      </Animated.View>
    </Animated.View>
  )
}

function RestaurantDetails({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Animated.View exiting={FadeOut.duration(150)} entering={FadeIn.delay(100)} style={{ marginBottom: 32 }}>
      {/* Restaurant Title Section */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <UIText type="titleEmphasized" color="white">
          {restaurant.name}
        </UIText>
      </View>

      {/* Info Pills */}
      <RestaurantInfoPills rating={restaurant.rating!} priceLevel={restaurant.price_level!} />
    </Animated.View>
  )
}

function MainMenu({ setMenuType, onDismiss }: { setMenuType: (type: 'restaurant' | 'navigation') => void; onDismiss: () => void }) {
  return (
    <>
      <PrimaryButton
        layout={LinearTransition}
        entering={SlideInRight.springify().mass(1).damping(16).stiffness(120)}
        exiting={SlideOutRight}
        text="Navigate"
        textType="calloutEmphasized"
        onPress={() => {
          setMenuType('navigation')
        }}
        style={{ flex: 1, borderRadius: 16 }}
      />
      <SecondaryButton
        entering={SlideInRight.springify().mass(1).damping(16).stiffness(120)}
        exiting={SlideOutRight}
        layout={LinearTransition}
        onPress={onDismiss}
        style={{ flex: 1, borderRadius: 16 }}
        textType="calloutEmphasized"
        text="Done"
      />
    </>
  )
}

export function NavigationMenu({ onBack, navigationLinks }: { onBack: () => void; navigationLinks: NavigationLinks }) {
  return (
    <Animated.View
      style={styles.navigationButtons}
      entering={SlideInLeft.springify().mass(1).damping(16).stiffness(120)}
      layout={LinearTransition}
      exiting={SlideOutLeft}
    >
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
      <GeneralButton onPress={onBack} style={[styles.mapButton, styles.backButton]}>
        <BackArrow />
      </GeneralButton>
    </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  backButton: {
    position: 'absolute',
    left: 0,
  },
})
