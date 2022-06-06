import { PlacesToVisitContentItem } from '@/components'
import { Colors } from '@/constants'
import { Typography } from '@/ui'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import {
  Animated,
  FlatList,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import MapView, { Marker } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { SharedElement } from 'react-navigation-shared-element'
import { styles } from './styles'

const zoomIn = {
  0: {
    opacity: 1,
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
  const HEADER_MAX_HEIGHT = height * 0.6
  const HEADER_MIN_HEIGHT = height * 0.11
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

  const scrollY = useRef(new Animated.Value(0)).current

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 4, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 1, 0],
  })

  const backButtonOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 100, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
  })

  const secondHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 100, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
  })

  useEffect(() => {
    isFocused &&
      setTimeout(() => {
        StatusBar.setBackgroundColor('transparent')
      }, 100)
  }, [])

  const { image, title, id, category, content, location } = route.params.data
  const { lat, lon } = location

  const handleGoBack = () => navigation.goBack()
  const ref = useRef()

  const keyExtractor = (item: any) => item.id
  const renderItem = ({ item, index }: any) => <PlacesToVisitContentItem key={index} item={item} index={index} />

  const openExternalApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${lat},${lon}`
    const label = 'Custom Label'
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <Animated.View style={{ opacity: backButtonOpacity }}>
        <TouchableOpacity style={[styles.backButton, { top: 16 + insets.top }]} onPress={handleGoBack}>
          <Icon name='arrow-back' color={Colors.white} size={30} />
        </TouchableOpacity>
      </Animated.View>

      <SharedElement id={`item.${id}.photo`} style={[styles.image]}>
        <Image style={[StyleSheet.absoluteFillObject, { height }]} resizeMode='cover' blurRadius={5} source={image} />
      </SharedElement>

      <Animated.View style={[styles.header, { height: HEADER_MAX_HEIGHT }]}>
        <Animated.View style={{ opacity: imageOpacity }}>
          <SharedElement id={`item.${id}.title`}>
            <Animated.Text style={[styles.title]}>{title}</Animated.Text>
          </SharedElement>
          <SharedElement id={`item.${id}.subTitle`}>
            <Text style={styles.subTitle}>{category}</Text>
          </SharedElement>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        ref={ref}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        <View style={styles.content}>
          {content ? (
            <>
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
            </>
          ) : null}
          <Typography.Default mt={20} ml={20} style={styles.contentTitle}>
            Карта
          </Typography.Default>
          <Animatable.View animation={zoomIn} duration={700} delay={400} style={styles.mapContainer}>
            <View style={[styles.mapView, { height: width / 1.15 }]}>
              <MapView
                onPress={openExternalApp}
                scrollEnabled={false}
                zoomEnabled={false}
                showsUserLocation={true}
                showsMyLocationButton={false}
                region={{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                style={[StyleSheet.absoluteFillObject]}
              >
                <Marker coordinate={{ latitude: lat, longitude: lon }} />
              </MapView>
            </View>
          </Animatable.View>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.secondHeader,
          { height: HEADER_MIN_HEIGHT, paddingTop: insets.top, opacity: secondHeaderOpacity },
        ]}
      >
        <TouchableOpacity style={[{ marginLeft: 20 }]} onPress={handleGoBack}>
          <Icon name='arrow-back' color={Colors.black} size={30} />
        </TouchableOpacity>
        <Typography.H3 ml={10} style={styles.contentTitle}>
          {title}
        </Typography.H3>
      </Animated.View>
    </View>
  )
}
