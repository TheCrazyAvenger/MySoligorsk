import { store } from '@/store'
import { ENVIRONMENT_NAME, WEB_DOMAIN_NAME } from '@env'
import analytics from '@react-native-firebase/analytics'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { enableLatestRenderer } from 'react-native-maps'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { Fonts, Screens } from './constants'
import { RootNavigator } from './navigation'
import { Typography } from './ui'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  `ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.`,
])

const linking = {
  prefixes: [`https://${WEB_DOMAIN_NAME}`],
  config: {
    screens: {
      [Screens.emailVerification]: '__/auth',
    },
  },
}

export const App = () => {
  const routeNameRef = useRef<any>()
  const navigationRef = useRef<any>()

  useEffect(() => {
    SplashScreen.hide()
    enableLatestRenderer()
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          linking={linking}
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
          {ENVIRONMENT_NAME !== 'prod' && (
            <Typography.Default
              size={16}
              style={{
                fontFamily: Fonts.openSansSemiBold,
                position: 'absolute',
                zIndex: 9999999,
                bottom: 10,
                left: 20,
              }}
            >
              Environment: {ENVIRONMENT_NAME}
            </Typography.Default>
          )}
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
