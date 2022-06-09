import { Colors, placesToVisitTheme, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Animated, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlacesToVisitItem } from '../PlacesToVisitItem'
import { styles } from './styles'

const DUMMY_PLACES = [
  {
    title: 'Шава Хаўз',
    category: 'Шаурмечная',
    image: require('@/assets/images/shavahouse.png'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    workingHours: [
      { id: 1, day: 'Понедельник', open: '11:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '11:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '11:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '11:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '11:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '11:00', close: '23:00' },
      { id: 7, day: 'Воскресенье', open: '11:00', close: '23:00' },
    ],
    content: {
      title: 'Меню',
      items: [
        {
          title: 'Шаурма Карри',
          description: '4.6р. - 8р.',
          image: require('@/assets/images/1.jpg'),
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '0',
        },
        {
          title: 'Шаурма Чикен',
          description: '8р.',
          image: require('@/assets/images/2.jpg'),
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '1',
        },
        {
          title: 'Шаурма Грибная',
          description: '5р. - 7р.',
          image: require('@/assets/images/3.jpg'),
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '2',
        },
        {
          title: 'Шаурма Туна',
          description: '8.5р.',
          image: require('@/assets/images/4.jpg'),
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '3',
        },
        {
          title: 'Шаурма Фреш',
          description: '6.5р.',
          image: require('@/assets/images/5.jpg'),
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '4',
        },
      ],
    },
    comments: [
      {
        user: 'Даниил Романеня',
        grade: 4,
        comment: 'Я не был в шава хаузе',
        date: '2022-06-07T19:34:48.290Z',
      },
      {
        user: 'Илья Павлющик',
        grade: 2,
        comment: 'Я был в шава хаузе',
        date: '2022-06-07T19:34:48.290Z',
      },
      {
        user: 'Миша Михаил',
        grade: 5,
        comment: 'Приятная музыка',
        date: '2022-06-07T19:34:48.290Z',
      },
      {
        user: 'Иван',
        grade: 3,
        comment: 'Вкусная шаурма',
        date: '2022-06-07T19:34:48.290Z',
      },
    ],
    id: '0',
  },
  {
    title: 'Green',
    category: 'ТЦ',
    image: require('@/assets/images/green.png'),
    location: {
      lat: 52.7923472,
      lon: 27.5421693,
    },
    workingHours: [
      { id: 1, day: 'Понедельник', open: '9:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '9:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '9:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '9:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '9:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '9:00', close: '23:00' },
      { id: 7, day: 'Воскресенье', open: '9:00', close: '23:00' },
    ],
    comments: [],
    id: '1',
  },

  {
    title: 'Мята',
    category: 'Кальянная',
    image: require('@/assets/images/mint.jpg'),
    location: {
      lat: 52.7928931,
      lon: 27.5444218,
    },
    workingHours: [
      { id: 1, day: 'Понедельник', open: '18:00', close: '2:00' },
      { id: 2, day: 'Вторник', open: '18:00', close: '2:00' },
      { id: 3, day: 'Среда', open: '18:00', close: '2:00' },
      { id: 4, day: 'Четверг', open: '18:00', close: '2:00' },
      { id: 5, day: 'Пятница', open: '18:00', close: '5:00' },
      { id: 6, day: 'Суббота', open: '18:00', close: '5:00' },
      { id: 7, day: 'Воскресенье', open: '18:00', close: '2:00' },
    ],
    comments: [],
    id: '2',
  },
  {
    title: 'Корона',
    category: 'ТЦ',
    image: require('@/assets/images/crown.png'),
    location: {
      lat: 52.7897416,
      lon: 27.5329346,
    },
    workingHours: [
      { id: 1, day: 'Понедельник', open: '9:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '9:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '9:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '9:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '9:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '9:00', close: '23:00' },
      { id: 7, day: 'Воскресенье', open: '9:00', close: '23:00' },
    ],
    comments: [],
    id: '3',
  },
]

export const PlacesToVisit = () => {
  const navigation = useNavigation<any>()
  const handleGoToCity = () => navigation.navigate(Screens.city)

  const scrollX = useRef(new Animated.Value(0)).current

  const { FULL_SIZE } = placesToVisitTheme
  const { width } = useWindowDimensions()

  const keyExtractor = (item: any) => item.id
  const renderItem = ({ item, index }: any) => (
    <PlacesToVisitItem
      key={item.id}
      data={item}
      scrollX={scrollX}
      index={index}
      isLast={+item.id === DUMMY_PLACES.length - 1}
    />
  )

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={handleGoToCity}>
        <View style={styles.title}>
          <Typography.H4 size={17}>Интересные места</Typography.H4>
        </View>
        <Icon name={'chevron-forward'} size={25} style={{ marginLeft: width / 2.8 }} color={Colors.black} />
      </TouchableOpacity>
      <Animated.FlatList
        data={DUMMY_PLACES}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate={'fast'}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      />
    </View>
  )
}
