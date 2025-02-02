import { Stack } from 'expo-router'
import { AuthProvider } from '@/providers/AuthProvider'
import { Provider } from 'jotai'
import { store } from '@/jotai/authAtom'
import QueryProvider from '@/providers/QueryProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ animation: 'fade' }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="login" />
            </Stack>
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryProvider>
    </Provider>
  )
}
