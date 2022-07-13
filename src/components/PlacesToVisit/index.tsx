import { Colors, placesToVisitTheme, Screens } from '@/constants'
import { Typography } from '@/ui'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlacesToVisitItem } from '../PlacesToVisitItem'
import { styles } from './styles'

export const PlacesToVisit = () => {
  const navigation = useNavigation<any>()
  const handleGoToCity = () => navigation.navigate(Screens.city)

  const [isLoading, setIsLoading] = useState(false)
  const [places, setPlaces] = useState<any>(null)

  const scrollX = useRef(new Animated.Value(0)).current

  const { FULL_SIZE } = placesToVisitTheme
  const { width } = useWindowDimensions()

  const onResult = async (data: any) => {
    const places = await data.docs.map((item: any) => item.data())
    setPlaces(places)
    setIsLoading(false)
  }

  const getPlaces = async () => {
    setIsLoading(true)
    await firestore().collection('Places').limit(5).onSnapshot(onResult)
  }

  useEffect(() => {
    getPlaces()
  }, [])

  const keyExtractor = (_: unknown, i: number) => i.toString()
  const renderItem = ({ item, index }: any) => (
    <PlacesToVisitItem
      key={index}
      places={places ?? [null, null]}
      data={item}
      scrollX={scrollX}
      index={index}
      isLast={index === places?.length - 1}
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
        data={places ?? [null, null]}
        scrollEnabled={!isLoading}
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
