import { Screens } from '@/constants'
import { selectUser } from '@/selectors'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Image, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from './styles'

const startPhrazes = [
  'Что будем делать сегодня?',
  'Как ваше настроение?',
  'Самое время узнать что-то новое',
  'Отличный день для прогулки',
  'Куда собираетесь сегодня сходить?',
]

export const HomeHeader = () => {
  const naviagtion = useNavigation<any>()
  const { firstname, avatar } = useSelector(selectUser)

  const time = new Date().getHours()
  const currentPhraze = useMemo(() => Math.floor(Math.random() * (4 - 0 + 1)) + 0, [])

  const handleGoToMenu = () => naviagtion.navigate(Screens.menu)

  const getWelcomeMessage = () => {
    if (time >= 0 && time <= 5) return 'Доброй ночи'
    if (time >= 6 && time <= 12) return 'Доброе утро'
    if (time >= 13 && time <= 16) return 'Добрый день'
    if (time >= 17 && time <= 24) return 'Добрый вечер'
    else return 'Здравствуйте'
  }

  return (
    <View style={styles.container}>
      <View>
        <Typography.H2 style={styles.headerTitle}>{getWelcomeMessage()}</Typography.H2>
        <Typography.Subtitle pt={8}>
          {firstname}, {startPhrazes[currentPhraze]}
        </Typography.Subtitle>
      </View>
      <TouchableRipple borderless style={{ borderRadius: 20 }} onPress={handleGoToMenu}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </TouchableRipple>
    </View>
  )
}
