import { selectIsLoggedIn } from '@/selectors'
import { setIsWaitForVerification } from '@/slices/applicationSettings'
import { removeLogin, setLogin } from '@/slices/authentication'
import { Spinner } from '@/ui'
import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationStackNavigator } from './ApplicationStackNavigator'
import { AuthenticationStackNavigator } from './AuthenticationStackNavigator'

export const RootNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)
  const onAuthStateChanged = async (user: any) => {
    if (user) {
      const isRegistered = !user.displayName && !user.isAnonymous
      const isWaitForVerification = !user.emailVerified && !user.isAnonymous
      if (isWaitForVerification) {
        await dispatch(setIsWaitForVerification(true))
        const onIdTokenChangedUnsubscribe = auth().onIdTokenChanged((user) => {
          const unsubscribeSetInterval = setTimeout(() => {
            auth().currentUser?.reload()
            auth().currentUser?.getIdToken(true)
          }, 10000)

          if (user && user.emailVerified) {
            clearInterval(unsubscribeSetInterval)
            onAuthStateChanged(user)
            return onIdTokenChangedUnsubscribe()
          }
        })
      } else {
        await dispatch(setIsWaitForVerification(false))
      }

      const { providerId, email, uid, isAnonymous } = user

      dispatch(
        setLogin({
          isAnonymous,
          isLoggedIn: true,
          isRegistered,
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
  useEffect(() => {
    const subscriber = auth().onUserChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {initializing && <Spinner />}
      {isLoggedIn ? <ApplicationStackNavigator /> : <AuthenticationStackNavigator />}
    </View>
  )
}
