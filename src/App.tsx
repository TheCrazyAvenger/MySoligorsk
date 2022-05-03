import { RootNavigator } from '@/navigation'
import { store } from '@/store'
import analytics from '@react-native-firebase/analytics'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'

export const App = () => {
  const routeNameRef = useRef<any>()
  const navigationRef = useRef<any>()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current
            const currentRouteName = navigationRef.current.getCurrentRoute().name

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              })
            }
            routeNameRef.current = currentRouteName
          }}
        >
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
