import { FormWrapper } from '@/components'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'

export const EmailVerificationScreen = () => {
  const navigation = useNavigation<any>()
  const opacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
  }, [])
  const handleSendAgain = () => {
    auth()
      .currentUser?.sendEmailVerification()
      .then(() => {
        setTimerOn(true)
      })
  }
  const handleLogout = () => auth().signOut()

  useEffect(() => {
    auth().currentUser?.sendEmailVerification()
  }, [])

  const [secondsLeft, setSecondsLeft] = useState(60)
  const [timerOn, setTimerOn] = useState(true)

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((secs) => {
        if (secs > 0) {
          return secs - 1
        } else {
          return 0
        }
      })
    }, 1000)
  }

  useEffect(() => {
    if (timerOn) {
      startTimer()
    } else {
      BackgroundTimer.stopBackgroundTimer()
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer()
    }
  }, [timerOn])

  useEffect(() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer()
      setTimerOn(false)
      setSecondsLeft(60)
    }
  }, [secondsLeft])

  const clockify = () => {
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)

    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds

    return {
      displayMins,
      displaySecs,
    }
  }

  return (
    <FormWrapper
      scrollViewStyle={{ opacity }}
      title={'Подтверждение Email'}
      description={
        'В течение минуты вам будет выслано письмо на указаный Email, перейдите по ссылке из письма, чтобы подтвердить свою регистрацию'
      }
      textBelowButtons={`Отправить еще раз через (${clockify().displayMins}:${clockify().displaySecs})`}
      disabledContinueBtn={timerOn}
      onContinue={handleSendAgain}
      buttonTitle={'Отпрвить еще раз'}
      secondButtonTitle={'Выйти из системы'}
      onSecondContinue={handleLogout}
    />
  )
}
