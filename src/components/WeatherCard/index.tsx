import { Colors } from '@/constants'
import { getWeatherBackground } from '@/helpers'
import { Typography } from '@/ui'
import React from 'react'
import { Image, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  data: any
}

const WeatherItem = ({ icon, value, condition }: any) => {
  return (
    <View style={styles.watherItem}>
      {icon}

      <Typography.Description pl={4} color={Colors.white} type='semiBold'>
        {value} {condition}
      </Typography.Description>
    </View>
  )
}

export const WeatherCard = ({ data }: Props) => {
  const { main, weather, wind } = data
  const { temp, feels_like, humidity, pressure } = main
  const { main: iocnName, icon } = weather[0]

  return (
    <View>
      <View style={styles.header}>
        <Typography.H4 pl={10}>Погода</Typography.H4>
      </View>
      <View style={[styles.card, { backgroundColor: getWeatherBackground(iocnName) }]}>
        <View style={styles.cityContainer}>
          <Typography.H3 color={Colors.white} pr={5}>
            Солигорск
          </Typography.H3>
          <Ionicons name='location' size={20} color={Colors.white} />
        </View>
        <View style={styles.weatherHeader}>
          <Typography.TitleText style={{ fontWeight: 'bold', fontSize: 45 }} color={Colors.white}>
            {Math.round(temp)}°
          </Typography.TitleText>
          <Image
            resizeMode='cover'
            source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
            style={{ marginLeft: -10, width: 100, height: 45 }}
          />
        </View>
        <Typography.Default pt={5} color={Colors.white} style={{ textAlign: 'center' }}>
          Ощущается как: {Math.round(feels_like)}°
        </Typography.Default>
        <View style={styles.conditions}>
          <WeatherItem
            icon={<Ionicons name={'water'} color={Colors.white} size={18} />}
            value={humidity}
            condition={'%'}
          />
          <WeatherItem
            icon={<Ionicons name={'filter'} color={Colors.white} size={18} />}
            value={wind.speed}
            condition={'км/ч'}
          />
          <WeatherItem
            icon={<Ionicons name={'speedometer'} color={Colors.white} size={18} />}
            value={humidity}
            condition={'кПа'}
          />
        </View>
      </View>
    </View>
  )
}
