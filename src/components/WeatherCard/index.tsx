import { Colors } from '@/constants'
import { getWeatherBackground } from '@/helpers'
import { Skeleton, Typography } from '@/ui'
import React from 'react'
import { Image, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  data: any
  loading: boolean
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

export const WeatherCard = ({ data, loading }: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <Typography.H4 pl={10}>Погода</Typography.H4>
      </View>
      {loading || !data ? (
        <Skeleton height={210} />
      ) : (
        <View style={[styles.card, { backgroundColor: getWeatherBackground(data?.weather?.[0]?.main) }]}>
          <View style={styles.cityContainer}>
            <Typography.H3 color={Colors.white} pr={5}>
              Солигорск
            </Typography.H3>
            <Ionicons name='location' size={20} color={Colors.white} />
          </View>
          <View style={styles.weatherHeader}>
            <Typography.TitleText style={{ fontWeight: 'bold', fontSize: 45 }} color={Colors.white}>
              {Math.round(data?.main?.temp)}°
            </Typography.TitleText>
            <Image
              resizeMode='cover'
              source={{ uri: `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png` }}
              style={{ marginLeft: -10, width: 100, height: 45 }}
            />
          </View>
          <Typography.Default pt={5} color={Colors.white} style={{ textAlign: 'center' }}>
            Ощущается как: {Math.round(data?.main?.feels_like)}°
          </Typography.Default>
          <View style={styles.conditions}>
            <WeatherItem
              icon={<Ionicons name={'water'} color={Colors.white} size={18} />}
              value={data?.main?.humidity}
              condition={'%'}
            />
            <WeatherItem
              icon={<Ionicons name={'filter'} color={Colors.white} size={18} />}
              value={data?.wind?.speed}
              condition={'км/ч'}
            />
            <WeatherItem
              icon={<Ionicons name={'speedometer'} color={Colors.white} size={18} />}
              value={data?.main?.pressure}
              condition={'кПа'}
            />
          </View>
        </View>
      )}
    </View>
  )
}
