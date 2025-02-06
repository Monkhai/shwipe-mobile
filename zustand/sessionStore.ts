import { User } from '@/queries/users/userTypes'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { create } from 'zustand'

type SessionStore = {
  sessionId: string | null
  restaurants?: Array<Restaurant>
  users: Array<User>
  isSessionStarted: boolean
  matchedRestaurantIndex: number | null

  __setSessionId: (sessionId: string | null) => void
  __setRestaurants: (restaurants: Array<Restaurant>) => void
  __setUsers: (users: Array<User>) => void
  __setIsSessionStarted: (isSessionStarted: boolean) => void
  __setMatchedRestaurantIndex: (matchedRestaurantIndex: number | null) => void
  __resetAll: () => void
}

export const useSessionStore = create<SessionStore>()((set, get) => ({
  sessionId: null,
  restaurants: [],
  users: [],
  isSessionStarted: false,
  matchedRestaurantIndex: null,

  __setMatchedRestaurantIndex: matchedRestaurantIndex => set({ matchedRestaurantIndex }),
  __setIsSessionStarted: isSessionStarted => set({ isSessionStarted }),
  __setSessionId: sessionId => set({ sessionId }),
  __setRestaurants: restaurants => set({ restaurants }),
  __setUsers: users => set({ users }),
  __resetAll: () => set({ sessionId: null, restaurants: [], users: [], isSessionStarted: false }),
}))
