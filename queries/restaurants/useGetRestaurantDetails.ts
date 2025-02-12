import functions from '@react-native-firebase/functions'
import { useQuery } from '@tanstack/react-query'
import { queryKeystore } from '../queryKeystore'
import { GET_RESTAURANT_DETAILS_CFN, RestaurantDetails } from './restaurantTypes'

type GetRestaurantProfileRequest = {
  placeId: string
}

type GetRestaurantProfileResponse = {
  restaurant: RestaurantDetails
}

const fn = functions().httpsCallable<GetRestaurantProfileRequest, GetRestaurantProfileResponse>(GET_RESTAURANT_DETAILS_CFN)

async function getRestaurantDetails(placeId: string) {
  const response = await fn({ placeId })
  return response.data.restaurant
}

export const useGetRestaurantDetails = (placeId: string) => {
  return useQuery({
    queryKey: queryKeystore.restaurantDetails(placeId),
    queryFn: () => getRestaurantDetails(placeId),
  })
}
