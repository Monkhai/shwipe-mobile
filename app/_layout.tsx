import { store } from '@/jotai/authAtom'
import { AuthProvider } from '@/providers/AuthProvider'
import { BaseNotificationData, invisibleNotificationTypes } from '@/providers/NotificationProvider/notfiicationTypes'
import { NotificationProvider } from '@/providers/NotificationProvider/NotificationsProvider'
import QueryProvider from '@/providers/QueryProvider'
import { PortalProvider } from '@gorhom/portal'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as Expo from 'expo'
import { setNotificationHandler } from 'expo-notifications'
import { Stack } from 'expo-router'
import { Provider } from 'jotai'
import { I18nManager, useColorScheme } from 'react-native'
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

const isRTL = I18nManager.isRTL
if (isRTL) {
  I18nManager.allowRTL(false)
  I18nManager.forceRTL(false)
  Expo.reloadAppAsync()
}

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light'
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NotificationProvider>
        <PortalProvider>
          <Provider store={store}>
            <QueryProvider>
              <AuthProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Stack screenOptions={{ animation: 'fade', headerShown: false }}>
                    <Stack.Screen name="login" />
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="+not-found" />
                    <Stack.Screen name="not-found" />
                  </Stack>
                </GestureHandlerRootView>
              </AuthProvider>
            </QueryProvider>
          </Provider>
        </PortalProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
