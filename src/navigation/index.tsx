import { selectIsLoggedIn } from '@/selectors'
import { setUser } from '@/slices'
import { setDarkTheme, setIsWaitForVerification } from '@/slices/applicationSettings'
import { removeLogin, setLogin } from '@/slices/authentication'
import { Spinner } from '@/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationStackNavigator } from './ApplicationStackNavigator'
import { AuthenticationStackNavigator } from './AuthenticationStackNavigator'

export const RootNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
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

      setLoading(true)
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then((responce) => {
          const data = responce.data()
          const { firstname, lastname, interests }: any = data

          dispatch(
            setUser({
              firstname: isAnonymous ? 'Anonymous' : firstname,
              lastname: isAnonymous ? uid : lastname,
              email,
              interests: isAnonymous ? null : interests,
            })
          )
          setLoading(false)
        })
        .catch(() => {
          isAnonymous &&
            dispatch(
              setUser({
                firstname: 'Anonymous',
                lastname: uid.slice(0, 9),
                email: 'No email',
                interests: [],
              })
            )
          setLoading(false)
        })
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

  const getDarkTheme = async () => {
    const darkTheme = await AsyncStorage.getItem('darkTheme')
    darkTheme && dispatch(setDarkTheme(darkTheme === 'true' ? true : false))
  }

  useEffect(() => {
    getDarkTheme()
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {initializing && <Spinner />}
      {isLoggedIn ? <ApplicationStackNavigator /> : <AuthenticationStackNavigator />}
    </View>
  )
}
