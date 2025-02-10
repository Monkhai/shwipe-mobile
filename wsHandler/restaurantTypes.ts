export interface Restaurant {
  name: string
  rating: number
  price_level: number
  photos: Array<string>
  navigation_links: NavigationLinks
}

export interface NavigationLinks {
  google_maps: string
  apple_maps: string
  waze: string
}
