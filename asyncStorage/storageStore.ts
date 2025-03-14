import { queryClient } from '@/providers/QueryProvider'
import { queryKeystore } from '@/queries/queryKeystore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'

const ONBOARDING_DATA_KEY = '@onboardingData'

interface OnboardingData {
  hasCompletedOnboarding: boolean
}

interface StorageStoreData extends OnboardingData {}

class StorageStore {
  private static instance: StorageStore
  private cache: Map<string, StorageStoreData>

  private constructor() {
    this.cache = new Map()
  }

  public static getInstance(): StorageStore {
    if (!StorageStore.instance) {
      StorageStore.instance = new StorageStore()
    }
    return StorageStore.instance
  }

  public async setOnboardingData(data: OnboardingData): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem(ONBOARDING_DATA_KEY, jsonValue)
      this.cache.set(ONBOARDING_DATA_KEY, data)
    } catch (error) {
      console.error('Error setting onboarding data:', error)
      throw error
    }
  }

  public async getOnboardingData(): Promise<OnboardingData | null> {
    try {
      const cachedData = this.cache.get(ONBOARDING_DATA_KEY)
      if (cachedData) {
        return cachedData
      }

      const jsonValue = await AsyncStorage.getItem(ONBOARDING_DATA_KEY)
      if (!jsonValue) return null

      const data = JSON.parse(jsonValue) as OnboardingData

      this.cache.set(ONBOARDING_DATA_KEY, data)
      return data
    } catch (error) {
      console.error('Error getting onboarding data:', error)
      throw error
    }
  }

  public clearCache(): void {
    this.cache.clear()
  }
}
const storageStore = StorageStore.getInstance()

export function useGetOnboardingData() {
  return useQuery({
    queryKey: queryKeystore.onboardingData,
    queryFn: () => storageStore.getOnboardingData(),
  })
}

export function useSetOnboardingData() {
  return useMutation({
    mutationFn: storageStore.setOnboardingData,
    onSuccess: (_, onboardingData) => {
      queryClient.setQueryData(queryKeystore.onboardingData, onboardingData)
    },
  })
}
