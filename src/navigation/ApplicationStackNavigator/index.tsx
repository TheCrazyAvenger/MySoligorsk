import { Colors, Navigators, Screens } from '@/constants'
import { PlacesToVisitCommentsScreen, PlacestoVisitDetailsScreen } from '@/screens'
import { selectIsRegistered } from '@/selectors'
import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { Easing, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { useSelector } from 'react-redux'
import { AcquaintanceStackNavigator } from '../AcquaintanceStackNavigator'
import { BottomTabNavigator } from './BottomTabNavigator'

const Stack = createSharedElementStackNavigator()

const bottomTabNavigatorOptions = {
  headerShown: false,
}

const acquaintanceNavigatorOptions = {
  headerShown: false,
}

const placesToVisitOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    }
  },
}

const placesToVisitCommentsOptions: any = ({ navigation }: any) => ({
  presentation: 'modal',
  title: 'Отзывы',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
      <Icon name='arrow-back' color={Colors.black} size={30} />
    </TouchableOpacity>
  ),
})

export const ApplicationStackNavigator = () => {
  const isRegistered = useSelector(selectIsRegistered)

  return (
    <Stack.Navigator>
      {isRegistered && (
        <Stack.Screen
          name={Screens.authVerification}
          options={acquaintanceNavigatorOptions}
          component={AcquaintanceStackNavigator}
        />
      )}

      <Stack.Screen name={Navigators.bottomTabs} component={BottomTabNavigator} options={bottomTabNavigatorOptions} />
      <Stack.Screen
        name={Screens.placestoVisitDetails}
        component={PlacestoVisitDetailsScreen}
        options={placesToVisitOptions}
        sharedElements={(route) => {
          const { id } = route.params.data
          return [
            {
              id: `item.${id}.photo`,
              animation: 'fade-out',
            },
            {
              id: `item.${id}.title`,
              animation: 'fade',
            },
            {
              id: `item.${id}.subTitle`,
              animation: 'fade',
            },
          ]
        }}
      />
      <Stack.Screen
        name={Screens.placesToVisitComments}
        component={PlacesToVisitCommentsScreen}
        options={placesToVisitCommentsOptions}
      />
    </Stack.Navigator>
  )
}
