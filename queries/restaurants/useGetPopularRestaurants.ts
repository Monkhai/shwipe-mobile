import funcions from '@react-native-firebase/functions'
import { GET_POPULAR_RESTAURANTS_CFN, Restaurant } from './restaurantTypes'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import * as Location from 'expo-location'
type GetPopularRestaurantsRequest = {
  latitude: number
  longitude: number
}

type GetPopularRestaurantsResponse = {
  restaurants: Restaurant[]
}

const fn = funcions().httpsCallable<GetPopularRestaurantsRequest, GetPopularRestaurantsResponse>(GET_POPULAR_RESTAURANTS_CFN)

async function getPopularRestaurants(): Promise<Restaurant[]> {
  const { coords } = await Location.getCurrentPositionAsync()
  const response = await fn({ latitude: coords.latitude, longitude: coords.longitude })
  return response.data.restaurants
}

export function useGetPopularRestaurants() {
  return useQuery({
    queryKey: queryKeystore.popularRestaurants,
    queryFn: getPopularRestaurants,
  })
}
