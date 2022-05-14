import { selectIsLoggedIn, selectIsRegistered } from '@/selectors'
import { removeLogin, setLogin } from '@/slices/authentication'
import { Spinner } from '@/ui'
import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AcquaintanceStackNavigator } from './AcquaintanceStackNavigator'
import { ApplicationStackNavigator } from './ApplicationStackNavigator'
import { AuthenticationStackNavigator } from './AuthenticationStackNavigator'

export const RootNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isRegistered = useSelector(selectIsRegistered)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)
  const onAuthStateChanged = (user: any) => {
    if (user) {
      const { providerId, email, uid, isAnonymous } = user
      dispatch(
        setLogin({
          isAnonymous,
          isLoggedIn: true,
          isRegistered: isAnonymous ? false : true,
          loginInfo: { token: uid, email, register_type: providerId },
        })
      )
    } else {
      dispatch(removeLogin())
    }
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {initializing && <Spinner />}
      {isRegistered ? (
        <AcquaintanceStackNavigator />
      ) : isLoggedIn ? (
        <ApplicationStackNavigator />
      ) : (
        <AuthenticationStackNavigator />
      )}
    </View>
  )
}
