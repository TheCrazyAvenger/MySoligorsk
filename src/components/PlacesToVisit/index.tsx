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
    categories: ['Шаурмечная', 'Кафе'],
    location: {
      lat: 52.7926454,
      lon: 27.5414154,
    },
    info: {
      phones: [{ title: 'Доставка', number: '+375291913364' }],
      address: { title: 'Железнодорожная 21А', lat: 52.7926454, lon: 27.5414154 },
      web: '',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/shavahouse_slg/' },
        { icon: 'account-box', url: 'https://vk.com/shavahouse' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '11:00', close: '23:00' },
      { id: 1, day: 'Понедельник', open: '11:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '11:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '11:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '11:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '11:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '11:00', close: '23:00' },
    ],
    content: {
      title: 'Меню',
      items: [
        {
          title: 'Шаурма Карри',
          description: '4.6р. - 8р.',
          imageUri: 'https://just-eat.by/image/cache/data/shops/24722/40674-300x300.jpg',
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '0',
        },
        {
          title: 'Шаурма Чикен',
          description: '8р.',
          imageUri: 'https://just-eat.by/image/cache/data/shops/24722/40674-300x300.jpg',
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '1',
        },
        {
          title: 'Шаурма Грибная',
          description: '5р. - 7р.',
          imageUri: 'https://just-eat.by/image/cache/data/shops/24722/40674-300x300.jpg',
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '2',
        },
        {
          title: 'Шаурма Туна',
          description: '8.5р.',
          imageUri: 'https://just-eat.by/image/cache/data/shops/24722/40674-300x300.jpg',
          onPress: 'https://www.instagram.com/shavahouse_slg/',
          id: '3',
        },
        {
          title: 'Шаурма Фреш',
          description: '6.5р.',
          imageUri: 'https://just-eat.by/image/cache/data/shops/24722/40674-300x300.jpg',
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
    categories: ['ТЦ'],
    location: {
      lat: 52.7923472,
      lon: 27.5421693,
    },
    info: {
      phones: [],
      address: { title: 'Железнодорожная 21А', lat: 52.7923472, lon: 27.5421693 },
      web: 'green-market.by',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/greenmarketby/' },
        { icon: 'account-box', url: 'https://vk.com/greenmarketby' },
        { icon: 'facebook', url: 'https://www.facebook.com/greenmarketby/' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '9:00', close: '23:00' },
      { id: 1, day: 'Понедельник', open: '9:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '9:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '9:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '9:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '9:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '9:00', close: '23:00' },
    ],
    comments: [],
    id: '1',
  },

  {
    title: 'Мята',
    category: 'Кальянная',
    categories: ['Кальянная'],
    location: {
      lat: 52.7928931,
      lon: 27.5444218,
    },
    info: {
      phones: [{ title: 'Доставка', number: '+375291913364' }],
      address: { title: 'Ленинского комсомола 38', lat: 52.7928931, lon: 27.5444218 },
      web: 'franshisa.by',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/myata.soligorsk/' },
        { icon: 'account-box', url: 'https://vk.com/myata.soligorsk' },
        { icon: 'facebook', url: 'https://www.facebook.com/pages/category/Lounge/myatasoligorsk-229866455043348/' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '18:00', close: '2:00' },
      { id: 1, day: 'Понедельник', open: '18:00', close: '2:00' },
      { id: 2, day: 'Вторник', open: '18:00', close: '2:00' },
      { id: 3, day: 'Среда', open: '18:00', close: '2:00' },
      { id: 4, day: 'Четверг', open: '18:00', close: '2:00' },
      { id: 5, day: 'Пятница', open: '18:00', close: '5:00' },
      { id: 6, day: 'Суббота', open: '18:00', close: '5:00' },
    ],
    comments: [],
    id: '2',
  },
  {
    title: 'Корона',
    category: 'ТЦ',
    categories: ['ТЦ'],
    location: {
      lat: 52.7897416,
      lon: 27.5329346,
    },
    info: {
      phones: [{ title: 'Доставка', number: '+375291913364' }],
      address: { title: 'Константина Заслонова 29', lat: 52.7897416, lon: 27.5329346 },
      web: 'korona.by',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/koronaby/' },
        { icon: 'account-box', url: 'https://vk.com/koronaby' },
        { icon: 'facebook', url: 'https://www.facebook.com/koronaby/' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '9:00', close: '23:00' },
      { id: 1, day: 'Понедельник', open: '9:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '9:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '9:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '9:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '9:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '9:00', close: '23:00' },
    ],
    comments: [],
    id: '3',
  },
  {
    title: 'Донер Стайл',
    category: 'Шаурмечная',
    categories: ['Шаурмечная', 'Кафе'],
    location: {
      lat: 52.7838424,
      lon: 27.5033468,
    },
    info: {
      phones: [{ title: 'Доставка', number: '+375291913364' }],
      address: { title: 'Молодежная 27А', lat: 52.7838424, lon: 27.5033468 },
      web: '',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/donerstyle__soligorsk/' },
        { icon: 'account-box', url: 'https://vk.com/public204081964' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '11:00', close: '22:00' },
      { id: 1, day: 'Понедельник', open: '11:00', close: '22:00' },
      { id: 2, day: 'Вторник', open: '11:00', close: '22:00' },
      { id: 3, day: 'Среда', open: '11:00', close: '22:00' },
      { id: 4, day: 'Четверг', open: '11:00', close: '22:00' },
      { id: 5, day: 'Пятница', open: '11:00', close: '22:00' },
      { id: 6, day: 'Суббота', open: '11:00', close: '22:00' },
    ],
    content: {
      title: 'Меню',
      items: [
        {
          title: 'Шаурма XS',
          description: '5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/5-MWKsl1hrPWsMREabRtAC5TNJw44jEVGM_Ksw/J_y5A1THv5A.jpg?crop=0,0.125,1,0.75&size=179x0&quality=95&sign=5dbca3121901821cb5e986fde82488f3',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5618418%2Fquery',
          id: '0',
        },
        {
          title: 'Шаурма S',
          description: '7р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/UHv18L8PAfzmK899GCWzM_lTCaB_nLQADPNkzg/mCn3EDFA2Po.jpg?crop=0,0.125,1,0.75&size=179x0&quality=95&sign=8726f94d50fc6bcb529ee263d02845ed',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5618419%2Fquery',
          id: '1',
        },
        {
          title: 'Овощной хот-дог',
          description: '4.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/w1q8Yaz-MigvUva8guf3LDVLUKWTAaJYJLUcZw/uLVL-7Q757U.jpg?size=520x0&quality=95&sign=31f53fe6cce2ab6e054799c0208e9cf3',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645088%2Fquery',
          id: '2',
        },
        {
          title: 'Луковые кольца',
          description: '6р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/GZ76xJPPjz_pjxDHORLtEGRtUkE2NUBVqzbGVQ/B6j3GqXb6Tw.jpg?size=179x0&crop=0.024,0.078,0.976,0.733&quality=95&sign=c4c5ab58b021a4875182a64cf4c2aec2',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645126%2Fquery',
          id: '3',
        },
        {
          title: 'Фри, 140 г.',
          description: '4.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/DbjoCmEqr4MkDLSsjle1Bm7vljVCZnhsMKJsow/RR826oqECds.jpg?size=520x0&quality=95&sign=f462ef7e46eaede7fd397ee8c39392c4',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645132%2Fquery',
          id: '4',
        },
        {
          title: 'Фри, 100 г.',
          description: '3.5р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/1EO2ebY0DJQoowqg2JA5yRF5oRJbTXL6yrJOHg/C3Be6ci6fFo.jpg?size=520x0&quality=95&sign=fa6c120c3ad1ec5e1cd087d85f26ca73',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645139%2Fquery',
          id: '5',
        },
        {
          title: 'Куриные наггетсы',
          description: '4.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/gyDoyJ9MC4laS9iI7m5zUakLhTPEp21cyTi78Q/KVvY1ORQ7M8.jpg?crop=0,0.125,1,0.75&size=179x0&quality=95&sign=3679b652511fc1b9eacb0f6046e2038f',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645145%2Fquery',
          id: '6',
        },
        {
          title: 'Гамбургер XXL',
          description: '6р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/iKXPgEJxLxCLMqN-_euUens1ZhNxMi5lJajfAw/isX1fPiLY1Q.jpg?crop=0.064,0,0.872,1&size=0x179&quality=95&sign=265750e23f16c41f01b444b9922994da',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_6081794%2Fquery',
          id: '7',
        },
        {
          title: 'Чизбургер XXL',
          description: '6.5р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/zOQeJfytKXiRXFfpAf9PiHL2HCUV52yFMuzRRg/euOH2iMAmLQ.jpg?crop=0.119,0,0.761,1&size=0x179&quality=95&sign=8ad182ff3205590469bd6f6c422e0493',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_6081798%2Fquery',
          id: '8',
        },
      ],
    },
    comments: [
      {
        user: 'Миша Михаил',
        grade: 5,
        comment: 'Приятная музыка',
        date: '2022-06-07T19:34:48.290Z',
      },
    ],
    id: '4',
  },
  {
    title: 'Шеф',
    category: 'Шаурмечная',
    categories: ['Шаурмечная', 'Кафе'],
    location: {
      lat: 52.7895714,
      lon: 27.5209499,
    },
    info: {
      phones: [{ title: 'Доставка', number: '+375291913364' }],
      address: { title: 'просп. Мира 16Б', lat: 52.7895714, lon: 27.5209499 },
      web: 'шеф.com',
      socials: [
        { icon: 'instagram', url: 'https://www.instagram.com/chef.slk/' },
        { icon: 'account-box', url: 'https://vk.com/chefslk' },
      ],
    },
    workingHours: [
      { id: 0, day: 'Воскресенье', open: '11:00', close: '23:00' },
      { id: 1, day: 'Понедельник', open: '11:00', close: '23:00' },
      { id: 2, day: 'Вторник', open: '11:00', close: '23:00' },
      { id: 3, day: 'Среда', open: '11:00', close: '23:00' },
      { id: 4, day: 'Четверг', open: '11:00', close: '23:00' },
      { id: 5, day: 'Пятница', open: '11:00', close: '23:00' },
      { id: 6, day: 'Суббота', open: '11:00', close: '23:00' },
    ],
    content: {
      title: 'Меню',
      items: [
        {
          title: 'Шаурма Итальянская',
          description: '6.5р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/aoZtwHYV-mOG7UPJ_ayvCoVCbmtdVAiClizjGw/wLHztY2dEU0.jpg?size=400x0&quality=95&sign=fe020b22c9a8ca3aeed5424755e70879',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4809298%2Fquery',
          id: '0',
        },
        {
          title: 'Шаурма Бульбашка',
          description: '7.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/5k73RmkA-Rmp0JuhsbR_xQ-rw-xfkOXEPa6JMA/Gpzyq9gXjwU.jpg?size=520x0&quality=95&sign=7fdcb719c1dbd64a24de454ad55fcdf9',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4809296%2Fquery',
          id: '1',
        },
        {
          title: 'Шаурма Классическая',
          description: '5.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/OxsNlsbZQ-XDH9veXFk6iYev8Kuq8oeetbZrbQ/e8ej_Vdu_wA.jpg?size=400x0&quality=95&sign=a886d916e1f97d631ad020196bc5a4e5',
          onPress: 'https://vk.com/market-204081964?w=product-204081964_5645088%2Fquery',
          id: '2',
        },
        {
          title: 'Щаурма Цезарь',
          description: '6.5р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/FIsLIKSpeuy7Tv722J43czb5i0oJnx6Ga7WeXQ/dXhs1uRJHfI.jpg?size=400x0&quality=95&sign=985f51ab76e9e9748332bc9b2ea22907',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823950%2Fquery',
          id: '3',
        },
        {
          title: 'Шаурма Греческая',
          description: '7р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/RSuOoNsm34ScQNGxdlyNKWHMxtbUklDqGVVlng/jSYBw-Qjvok.jpg?size=400x0&quality=95&sign=58314d7af1a415b3fd2160ffa177d8e5',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823951%2Fquery',
          id: '4',
        },
        {
          title: 'Шаурма Фиш',
          description: '8.5р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/TpCh0KSHyQh66JT3q4zmJiBBmEMz-2YdVAfhew/Y9UIKeE3C04.jpg?size=400x0&quality=95&sign=9329dbc500b870a5ccb026c6872f0dda',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823952%2Fquery',
          id: '5',
        },
        {
          title: 'Шаурма Гавайская',
          description: '7р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/hRb9ZsZj1ZGQYQZedQGZTTPi5qI4cCmR1-Sv_A/7KP0uSGGXNg.jpg?size=400x0&quality=95&sign=c5dbe60897cf493964ee58022531f7e1',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823954%2Fquery',
          id: '6',
        },
        {
          title: 'Шаурма Мексиканская',
          description: '7р.',
          imageUri:
            'https://sun2.velcom-by-minsk.userapi.com/impg/kuJKXQ_e7I_4X0xYMIaidvs4jL-MeoAX09Mf7A/y_LvVbNxdZs.jpg?size=400x0&quality=95&sign=d26503588d3cef46fe21db764b7ae7bc',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823960%2Fquery',
          id: '7',
        },
        {
          title: 'Шаурма Корейская',
          description: '7р.',
          imageUri:
            'https://sun1.velcom-by-minsk.userapi.com/impg/8LdolKPI3fX0Eu5n4qS4kZ_cPVyNQ3AO5rC0dA/txZOgt3j3A4.jpg?size=400x0&quality=95&sign=0802b70ec22c022df2ba6d204a8c89df',
          onPress: 'https://vk.com/market-202829512?w=product-202829512_4823961%2Fquery',
          id: '8',
        },
      ],
    },
    comments: [
      {
        user: 'Миша Михаил',
        grade: 5,
        comment: 'Приятная музыка',
        date: '2022-06-07T19:34:48.290Z',
      },
    ],
    id: '5',
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
      places={DUMMY_PLACES}
      data={item}
      scrollX={scrollX}
      index={index}
      isLast={index === DUMMY_PLACES.length - 1}
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
