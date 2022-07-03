import { Typography } from '@/ui'
import React from 'react'
import { Linking, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles } from './styles'

type Props = {
  item: any
  index: number
}

export const PlacesToVisitContentItem = ({ item }: Props) => {
  const { width } = useWindowDimensions()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.itemContainer, { width: width * 0.33, height: width * 0.5 }]}
      onPress={() => Linking.openURL(item.onPress)}
    >
      <FastImage
        style={styles.itemImage}
        source={
          item.image ?? {
            uri: item.imageUri,
          }
        }
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <Typography.Default numberOfLines={2} lineH={19} mt={2} type='semiBold'>
          {item.title}
        </Typography.Default>
        <Typography.Subtitle mt={3}>{item.description}</Typography.Subtitle>
      </View>
    </TouchableOpacity>
  )
}
