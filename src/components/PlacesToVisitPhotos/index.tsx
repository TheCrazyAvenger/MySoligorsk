import { Colors, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  uris: string[]
  title: string
}

export const PlacesToVisitPhotos = ({ uris, title }: Props) => {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()

  const handleGoToPhotos = () => navigation.navigate(Screens.placesToVisitPhotos, { title })

  const keyExtractor = (item: any) => item
  const renderItem = ({ item, index }: any) => {
    const isLast = index === uris.length - 1
    const handleGoToPhoto = () =>
      navigation.navigate(Screens.placesToVisitPhoto, { uris, index, title, showReport: true })

    return (
      <View key={index} style={[isLast && { flexDirection: 'row' }]}>
        <TouchableRipple borderless onPress={handleGoToPhoto} style={[styles.imageContainer, { width: width * 0.7 }]}>
          <Image style={[StyleSheet.absoluteFillObject]} borderRadius={20} resizeMode='cover' source={{ uri: item }} />
        </TouchableRipple>
        {isLast && (
          <TouchableRipple borderless onPress={handleGoToPhotos} style={[styles.seeAllContainer]}>
            <View style={styles.seeAll}>
              <Icon name={'images-outline'} size={55} color={Colors.white} />
              <Typography.Subtitle mt={5} color={Colors.white}>
                Все фото
              </Typography.Subtitle>
            </View>
          </TouchableRipple>
        )}
      </View>
    )
  }

  return (
    <FlatList
      data={uris}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  )
}
