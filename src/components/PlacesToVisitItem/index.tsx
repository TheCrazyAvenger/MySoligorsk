import { Colors, placesToVisitTheme, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

type Props = {
  data: {
    title: string
    category: string
    image: any
    id: number
    workingHours: { id: number; day: string; open: string; close: string }[]
  }
  isLast: boolean
  index: number
  scrollX: Animated.Value
  places: any
}

export const PlacesToVisitItem = ({ data, isLast, index, scrollX, places }: Props) => {
  const navigation = useNavigation<any>()
  const { title, category, image, id, workingHours } = data
  const { FULL_SIZE, ITEM_WIDTH, ITEM_HEIGHT } = placesToVisitTheme

  const currentDay = new Date().getDay()
  const currentWorkingHours = workingHours[currentDay]
  const { open, close } = currentWorkingHours

  const [like, setLike] = useState(id === 1 ? true : false)

  const handleLike = () => setLike((prev) => !prev)
  const handleGoToDetails = () => navigation.navigate(Screens.placestoVisitDetails, { data, places })

  const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
  })
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1.2, 1],
  })
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  })

  return (
    <Animatable.View animation={'zoomIn'} duration={700} delay={100 + index * 100} style={styles.content}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleGoToDetails}
        style={[styles.container, { marginRight: isLast ? ITEM_WIDTH : 0 }]}
      >
        <View style={styles.content}>
          <Animated.Image
            style={[StyleSheet.absoluteFillObject, styles.image, { transform: [{ scale }] }]}
            source={image}
            resizeMode={'cover'}
          />
          <Animated.View style={[styles.imageInner, { transform: [{ scale }] }]}>
            <Animated.Text style={[styles.title, { transform: [{ translateX }] }]}>{title}</Animated.Text>
            <Animated.Text style={[styles.subTitle, { transform: [{ translateX }] }]}>{category}</Animated.Text>
            <Animated.View style={[styles.hoursContainer, { opacity }]}>
              <Typography.SmallDescription mt={2} size={11.5}>
                {open} - {close}
              </Typography.SmallDescription>
            </Animated.View>
            <Animated.View style={[styles.likeButton, { opacity }]}>
              <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
                <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isLast && (
        <Typography.Default style={{ position: 'absolute', right: ITEM_WIDTH / 2.8, top: ITEM_HEIGHT / 2 }}>
          Больше
        </Typography.Default>
      )}
    </Animatable.View>
  )
}
