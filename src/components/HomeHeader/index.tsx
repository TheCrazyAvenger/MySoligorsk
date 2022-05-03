import { useGetWeatherQuery } from '@/api'
import { selectUser } from '@/selectors'
import { Typography } from '@/ui'
import React from 'react'
import { Image, View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './styles'

export const HomeHeader = () => {
  const { firstname, lastname } = useSelector(selectUser)

  const { data } = useGetWeatherQuery({})

  const time = new Date().getHours()

  const getWelcomeMessage = () => {
    if (time >= 0 && time <= 5) return 'Доброй ночи,'
    if (time >= 6 && time <= 12) return 'Доброе утро,'
    if (time >= 13 && time <= 16) return 'Добрый день,'
    if (time >= 17 && time <= 24) return 'Добрый вечер,'
    else return 'Здравствуйте,'
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleinner}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View>
          <Typography.Default style={styles.headerTitle}>{getWelcomeMessage()}</Typography.Default>
          <Typography.H3 style={styles.headerSubtitile}>
            {firstname} {lastname}
          </Typography.H3>
        </View>
      </View>
      {/* <View style={styles.weather}>
        {!data ? (
          <Typography.H3 style={styles.weatherText}>N/A ℃</Typography.H3>
        ) : (
          <>
            <Image
              style={styles.weatherIcon}
              source={{ uri: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }}
            />
            <Typography.H3 style={styles.weatherText}>{Math.round(data.main.temp)} ℃</Typography.H3>
          </>
        )}
      </View> */}
    </View>
  )
}
