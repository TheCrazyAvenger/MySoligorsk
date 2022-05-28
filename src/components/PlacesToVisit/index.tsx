import { Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlacesToVisitItem } from '../PlacesToVisitItem'
import { styles } from './styles'

const DUMMY_PLACES = [
  {
    title: 'Green',
    category: 'ТЦ',
    image: require('@/assets/images/green.png'),
    id: 0,
  },
  {
    title: 'Мята',
    category: 'Кальянная',
    image: require('@/assets/images/mint.png'),
    id: 1,
  },
  {
    title: 'Корона',
    category: 'ТЦ',
    image: require('@/assets/images/crown.png'),
    id: 2,
  },
]

export const PlacesToVisit = () => {
  const navigation = useNavigation<any>()
  const handleGoToCity = () => navigation.navigate(Screens.city)

  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity style={styles.header} onPress={handleGoToCity}>
        <View style={styles.title}>
          <Typography.H4 size={17}>Интересные места</Typography.H4>
        </View>
        <Icon name={'chevron-forward'} size={25} />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {DUMMY_PLACES.map((item) => (
          <PlacesToVisitItem key={item.id} data={item} isLast={item.id === DUMMY_PLACES.length - 1} />
        ))}
      </ScrollView>
    </View>
  )
}
