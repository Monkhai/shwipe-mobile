import { PlaceData } from '@googlemaps/google-maps-services-js'

export const GET_POPULAR_RESTAURANTS_CFN = 'getPopularRestaurants'
export const GET_RESTAURANT_DETAILS_CFN = 'getRestaurantDetails'

export interface Restaurant {
  place_id: string
  name: string
  rating: number
  price_level: number
  photos: Array<string>
  navigation_links: NavigationLinks
  address: string
}

export interface NavigationLinks {
  google_maps: string
  apple_maps: string
  waze: string
}

export interface RestaurantDetails extends Partial<PlaceData> {
  photo_urls: Array<string>
  navigation_links: NavigationLinks
}
