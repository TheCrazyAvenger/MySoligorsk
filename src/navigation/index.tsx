import { selectIsLoggedIn, selectIsRegistered } from '@/selectors'
import { setIsWaitForVerification } from '@/slices/applicationSettings'
import { removeLogin, setLogin } from '@/slices/authentication'
import { Spinner } from '@/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  const onAuthStateChanged = async (user: any) => {
    const isSignIn = await AsyncStorage.getItem('isSignIn')

    if (user) {
      // await auth().currentUser?.reload()
      // auth().currentUser?.getIdToken(true)
      const isWaitForVerification = !isSignIn && !user.emailVerified && !user.isAnonymous
      if (isWaitForVerification) {
        await dispatch(setIsWaitForVerification(true))
      } else {
        await dispatch(setIsWaitForVerification(false))
      }

      const { providerId, email, uid, isAnonymous } = user
      dispatch(
        setLogin({
          isAnonymous,
          isLoggedIn: true,
          isRegistered: isSignIn ? false : isAnonymous ? false : true,
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
