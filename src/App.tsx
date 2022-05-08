import { RootNavigator } from '@/navigation'
import { store } from '@/store'
import analytics from '@react-native-firebase/analytics'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  `ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.`,
])

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
