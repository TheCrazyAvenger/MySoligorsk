import { selectIsLoggedIn } from '@/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationStackNavigator } from './ApplicationStackNavigator'
import { AuthenticationStackNavigator } from './AuthenticationStackNavigator'

export const RootNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return !isLoggedIn ? <AuthenticationStackNavigator /> : <ApplicationStackNavigator />
}
