import React from 'react'
import { ScrollView } from 'react-native'
import { PlacesToVisitItem } from '../PlacesToVisitItem'

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
  return (
    <ScrollView style={{ marginTop: 30 }} horizontal showsHorizontalScrollIndicator={false}>
      {DUMMY_PLACES.map((item) => (
        <PlacesToVisitItem key={item.id} data={item} isLast={item.id === DUMMY_PLACES.length - 1} />
      ))}
    </ScrollView>
  )
}
