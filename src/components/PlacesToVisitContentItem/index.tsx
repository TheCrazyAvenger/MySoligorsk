import { Typography } from '@/ui'
import React from 'react'
import { Image, Linking, TouchableOpacity, useWindowDimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { styles } from './styles'

type Props = {
  item: any
  index: number
}

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

export const PlacesToVisitContentItem = ({ item, index }: Props) => {
  const { width } = useWindowDimensions()

  return (
    <Animatable.View animation={zoomIn} duration={700} delay={400 + index * 100}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.itemContainer, { width: width * 0.33, height: width * 0.5 }]}
        onPress={() => Linking.openURL(item.onPress)}
      >
        <Image style={styles.itemImage} borderRadius={10} source={item.image} resizeMode='cover' />
        <Typography.Default style={styles.itemTitle}>{item.title}</Typography.Default>
        <Typography.Description mt={3}>{item.description}</Typography.Description>
      </TouchableOpacity>
    </Animatable.View>
  )
}