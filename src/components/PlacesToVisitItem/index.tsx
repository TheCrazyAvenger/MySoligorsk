import { Colors, Fonts, placesToVisitTheme, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SharedElement } from 'react-navigation-shared-element'
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
    <Animatable.View animation={zoomIn} duration={700} delay={100 + index * 100} style={styles.content}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleGoToDetails}
        style={[styles.container, { marginRight: isLast ? ITEM_WIDTH : 0 }]}
      >
        <View style={styles.content}>
          <SharedElement id={`item.${data.id}.photo`} style={[StyleSheet.absoluteFillObject]}>
            <Animated.Image
              style={[StyleSheet.absoluteFillObject, styles.image, { transform: [{ scale }] }]}
              source={image}
              resizeMode={'cover'}
            />
          </SharedElement>
          <Animated.View style={[styles.imageInner, { transform: [{ scale }] }]}>
            <SharedElement id={`item.${id}.title`}>
              <Animated.Text style={[styles.title, { transform: [{ translateX }] }]}>{title}</Animated.Text>
            </SharedElement>
            <SharedElement id={`item.${id}.subTitle`}>
              <Animated.Text style={[styles.subTitle, { transform: [{ translateX }] }]}>{category}</Animated.Text>
            </SharedElement>
            <Animated.Text
              style={[
                styles.subTitle,
                { transform: [{ translateX }], marginTop: 6, fontFamily: Fonts.openSansRegular, fontSize: 12.5 },
              ]}
            >
              {open} - {close}
            </Animated.Text>
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
