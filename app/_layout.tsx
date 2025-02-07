import { Stack } from 'expo-router'
import { AuthProvider } from '@/providers/AuthProvider'
import { Provider } from 'jotai'
import { store } from '@/jotai/authAtom'
import QueryProvider from '@/providers/QueryProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { setNotificationHandler } from 'expo-notifications'
import { BaseNotificationData, NotificationType } from '@/providers/NotificationProvider/notfiicationTypes'
import { NotificationProvider } from '@/providers/NotificationProvider/NotificationsProvider'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

const invisibleNotificationTypes = [NotificationType.FRIEND_REQUEST_SENT, NotificationType.FRIEND_REQUEST_UPDATED]

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
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                </Stack>
              </GestureHandlerRootView>
            </AuthProvider>
          </QueryProvider>
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
