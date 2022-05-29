import { Colors } from '@/constants'
import { Typography } from '@/ui'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  FlatList,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { SharedElement } from 'react-navigation-shared-element'
import { styles } from './styles'

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

export const PlacestoVisitDetailsScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    isFocused &&
      setTimeout(() => {
        StatusBar.setBackgroundColor('transparent')
      }, 100)
  }, [])

  const { image, title, id, category, content } = route.params.data

  const handleGoBack = () => navigation.goBack()

  const keyExtractor = (item: any) => item.id
  const renderItem = ({ item, index }: any) => {
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

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <TouchableOpacity style={[styles.backButton, { top: 20 + insets.top }]} onPress={handleGoBack}>
        <Icon name='arrow-back' color={Colors.white} size={30} />
      </TouchableOpacity>
      <SharedElement id={`item.${id}.photo`} style={[StyleSheet.absoluteFillObject]}>
        <Image
          style={[StyleSheet.absoluteFillObject, styles.image]}
          resizeMode='cover'
          borderRadius={20}
          blurRadius={5}
          source={image}
        />
      </SharedElement>
      <View style={[styles.content, { paddingTop: insets.top + 110 }]}>
        <View style={{ paddingHorizontal: 20 }}>
          <SharedElement id={`item.${id}.title`}>
            <Text style={styles.title}>{title}</Text>
          </SharedElement>
          <SharedElement id={`item.${id}.subTitle`}>
            <Text style={styles.subTitle}>{category}</Text>
          </SharedElement>
        </View>

        {content ? (
          <View style={{ marginTop: height * 0.25 }}>
            <Typography.Default ml={20} style={styles.contentTitle}>
              {content.title}
            </Typography.Default>
            <FlatList
              data={content.items}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={{ paddingLeft: 20 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : null}
      </View>
    </View>
  )
}
