import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { styles } from './styles'

type Props = {
  uri: string
}

export const PlacesToVisitPhotos = ({ uri }: Props) => {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Typography.H4 mb={10}>Фото</Typography.H4>
      <View style={{ height: 200, width: width * 0.6 }}>
        <Image style={[StyleSheet.absoluteFillObject]} borderRadius={20} resizeMode='cover' source={{ uri }} />
      </View>
    </View>
  )
}
