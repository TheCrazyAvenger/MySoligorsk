import { store } from '@/store'
import { ENVIRONMENT_NAME, WEB_DOMAIN_NAME } from '@env'
import analytics from '@react-native-firebase/analytics'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { enableLatestRenderer } from 'react-native-maps'
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { Provider, useSelector } from 'react-redux'
import { Screens } from './constants'
import { RootNavigator } from './navigation'
import { selectDarkTheme } from './selectors/applicationSettings'
import { Typography } from './ui'

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2f80ed',
    grey: '#828282',
    lightGrey: '#e3e3e3',
    navigation: '#F3EDF7',
    input: '#F2F2F2',
    inputBorder: '#D1CBCB',
    error: '#EB5757',
    disabledError: '#f39a9a',
    orange: '#F2994A',
    grass: '#27AE60',
  },
}

const IsDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#2f80ed',
    background: '#1C1B1F',
    grey: '#9F9AA1',
    lightGrey: '#828282',
    navigation: '#2A2831',
    input: '#49454F',
    inputBorder: '#9D989E',
    error: '#EB5757',
    disabledError: '#f39a9a',
    orange: '#F2994A',
    grass: '#27AE60',
  },
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  `ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.`,
  'new NativeEventEmitter',
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
                position: 'absolute',
                zIndex: 9999999,
                bottom: 10,
                left: 20,
              }}
            >
              Environment: {ENVIRONMENT_NAME}
            </Typography.Default>
          )}
          <WrapperApp />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

const WrapperApp = () => {
  const darkTheme = useSelector(selectDarkTheme)

  return (
    <PaperProvider theme={darkTheme ? IsDarkTheme : Theme}>
      <RootNavigator />
    </PaperProvider>
  )
}
