import { Header, PlacesToVisitEditCommentsScreen } from '@/components'
import { Navigators, Screens } from '@/constants'
import {
  CompleteScreen,
  PlacesToVisitCommentsScreen,
  PlacestoVisitDetailsScreen,
  PlacesToVisitPhotoScreen,
  PlacesToVisitPhotosScreen,
} from '@/screens'
import { selectIsRegistered } from '@/selectors'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'
import { AcquaintanceStackNavigator } from '../AcquaintanceStackNavigator'
import { BottomTabNavigator } from './BottomTabNavigator'

const Stack = createNativeStackNavigator()

const stackNavigatorOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  animation: 'fade_from_bottom',
  header: (props: any) => <Header {...props} />,
}

const photoOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

const completeOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'default',
}

const bottomTabNavigatorOptions = {
  headerShown: false,
}

const acquaintanceNavigatorOptions = {
  headerShown: false,
}

const placesToVisitOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
}

export const ApplicationStackNavigator = () => {
  const isRegistered = useSelector(selectIsRegistered)

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      {isRegistered && (
        <Stack.Screen
          name={Screens.authVerification}
          options={acquaintanceNavigatorOptions}
          component={AcquaintanceStackNavigator}
        />
      )}

      <Stack.Screen name={Navigators.bottomTabs} component={BottomTabNavigator} options={bottomTabNavigatorOptions} />
      <Stack.Group>
        <Stack.Screen
          name={Screens.placestoVisitDetails}
          component={PlacestoVisitDetailsScreen}
          options={placesToVisitOptions}
        />
        <Stack.Screen
          name={Screens.placesToVisitComments}
          component={PlacesToVisitCommentsScreen}
          options={{ title: '????????????' }}
        />
        <Stack.Screen
          name={Screens.placesToVisitPhotos}
          component={PlacesToVisitPhotosScreen}
          options={{ title: '????????' }}
        />
        <Stack.Screen name={Screens.placesToVisitPhoto} component={PlacesToVisitPhotoScreen} options={photoOptions} />
        <Stack.Screen
          name={Screens.placesToVisitEditComments}
          options={{ title: '?????? ??????????' }}
          component={PlacesToVisitEditCommentsScreen}
        />
        <Stack.Screen name={Screens.completeScreen} options={completeOptions} component={CompleteScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
