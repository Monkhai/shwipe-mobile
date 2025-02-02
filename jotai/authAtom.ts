import { atom, createStore } from 'jotai'
import { User } from 'firebase/auth'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const userAtom = atom<FirebaseAuthTypes.User | null>(null)

export const store = createStore()
