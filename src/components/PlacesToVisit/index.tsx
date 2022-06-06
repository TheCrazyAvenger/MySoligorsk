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
    id: '0',
  },
  {
    title: 'Green',
    category: 'ТЦ',
    image: require('@/assets/images/green.png'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    id: '1',
  },

  {
    title: 'Мята',
    category: 'Кальянная',
    image: require('@/assets/images/mint.jpg'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    content: {
      title: 'Меню',
      items: [{}],
    },
    id: '2',
  },
  {
    title: 'Корона',
    category: 'ТЦ',
    image: require('@/assets/images/crown.png'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    id: '3',
  },
  {
    title: 'Green',
    category: 'ТЦ',
    image: require('@/assets/images/green.png'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    id: '4',
  },
  {
    title: 'Мята',
    category: 'Кальянная',
    image: require('@/assets/images/mint.jpg'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    id: '5',
  },
  {
    title: 'Корона',
    category: 'ТЦ',
    image: require('@/assets/images/crown.png'),
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    id: '6',
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
