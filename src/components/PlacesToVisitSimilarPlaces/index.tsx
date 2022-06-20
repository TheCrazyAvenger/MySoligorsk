import { Colors, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SharedElement } from 'react-navigation-shared-element'
import { styles } from './styles'

type Props = {
  data: any
  places: any
}

export const PlacesToVisitSimilarPlaces = ({ data, places }: Props) => {
  const navigation = useNavigation<any>()

  return (
    <View style={styles.content}>
      <Typography.ContentTitle ml={20} mb={10}>
        Похожие места
      </Typography.ContentTitle>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data.map((item: any, i: number) => {
          const { title, image, category, workingHours } = item
          const isLast = i === data.length - 1

          const currentDay = new Date().getDay()
          const currentWorkingHours = workingHours[currentDay]
          const { open, close } = currentWorkingHours

          const [like, setLike] = useState(item.id === 1 ? true : false)

          const handleLike = () => setLike((prev) => !prev)
          const handleGoToDetails = () => navigation.replace(Screens.placestoVisitDetails, { data: item, places })

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={handleGoToDetails}
              style={[styles.container, { marginLeft: 20, marginRight: isLast ? 20 : 0 }]}
            >
              <SharedElement id={`item.${data.id}.photo`} style={[StyleSheet.absoluteFillObject]}>
                <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={image} resizeMode={'cover'} />
              </SharedElement>
              <View style={styles.imageInner}>
                <SharedElement id={`item.${item.id}.title`}>
                  <Typography.H2 style={styles.title} color={Colors.white}>
                    {title}
                  </Typography.H2>
                </SharedElement>
                <SharedElement id={`item.${item.id}.subTitle`}>
                  <Typography.Default color={Colors.white}>{category}</Typography.Default>
                </SharedElement>

                <Typography.SmallDescription color={Colors.white} mt={6}>
                  {open} - {close}
                </Typography.SmallDescription>
                <View style={styles.likeButton}>
                  <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
                    <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
