import { store } from '@/jotai/authAtom'
import { AuthProvider } from '@/providers/AuthProvider'
import { BaseNotificationData, invisibleNotificationTypes } from '@/providers/NotificationProvider/notfiicationTypes'
import { NotificationProvider } from '@/providers/NotificationProvider/NotificationsProvider'
import QueryProvider from '@/providers/QueryProvider'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { setNotificationHandler } from 'expo-notifications'
import { Stack } from 'expo-router'
import { Provider } from 'jotai'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

setNotificationHandler({
  handleNotification: async n => {
    const data = n.request.content.data as BaseNotificationData
    const shouldShow = !invisibleNotificationTypes.includes(data.type)
    return {
      shouldShowAlert: shouldShow,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }
  },
})

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NotificationProvider>
        <Provider store={store}>
          <QueryProvider>
            <AuthProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ animation: 'fade' }}>
                  <Stack.Screen name="login" />
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                  <Stack.Screen name="not-found" options={{ headerShown: false }} />
                </Stack>
              </GestureHandlerRootView>
            </AuthProvider>
          </QueryProvider>
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
