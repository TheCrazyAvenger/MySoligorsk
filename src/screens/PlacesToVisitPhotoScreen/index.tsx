import { useRoute } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { styles } from './styles'

export const PlacesToVisitPhotoScreen = () => {
  const route = useRoute<any>()
  const { width, height } = useWindowDimensions()

  const { uri } = route.params

  return (
    <View style={styles.container}>
      <AutoHeightImage width={width} maxHeight={height} source={{ uri }} />
    </View>
  )
}
