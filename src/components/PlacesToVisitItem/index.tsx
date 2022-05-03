import { Colors } from '@/constants'
import { Typography } from '@/ui'
import React, { useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

type Props = {
  data: { title: string; category: string; image: any; id: number }
  isLast: boolean
}
export const PlacesToVisitItem = ({ data, isLast }: Props) => {
  const { title, category, image, id } = data

  const [like, setLike] = useState(id === 1 ? true : false)

  const handleLike = () => setLike((prev) => !prev)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {}}
      style={[styles.container, { marginRight: isLast ? 20 : 0 }]}
    >
      <ImageBackground style={styles.imageBackground} source={image}>
        <View style={styles.imageInner}>
          <Typography.H2 style={styles.title} color={Colors.white}>
            {title}
          </Typography.H2>
          <Typography.Description pt={5} style={styles.title} color={Colors.white}>
            {category}
          </Typography.Description>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike} activeOpacity={0.7}>
            <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
