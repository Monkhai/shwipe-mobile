import { Restaurant } from '@/wsHandler/restaurantTypes'
import { SAFE_SessionUser } from '@/wsHandler/serverMessagesTypes'
import { create } from 'zustand'

type SessionStore = {
  sessionId: string | null
  restaurants?: Array<Restaurant>
  users: Array<SAFE_SessionUser>
  isSessionStarted: boolean

  __setSessionId: (sessionId: string | null) => void
  __setRestaurants: (restaurants: Array<Restaurant>) => void
  __setUsers: (users: Array<SAFE_SessionUser>) => void
  __setIsSessionStarted: (isSessionStarted: boolean) => void
  __resetAll: () => void
}

export const useSessionStore = create<SessionStore>()((set, get) => ({
  sessionId: null,
  restaurants: [],
  users: [],
  isSessionStarted: false,

  __setIsSessionStarted: isSessionStarted => set({ isSessionStarted }),
  __setSessionId: sessionId => set({ sessionId }),
  __setRestaurants: restaurants => set({ restaurants }),
  __setUsers: users => set({ users }),
  __resetAll: () => set({ sessionId: null, restaurants: [], users: [], isSessionStarted: false }),
}))
