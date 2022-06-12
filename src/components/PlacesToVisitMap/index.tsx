import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Linking, Platform, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import MapView, { Marker } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'

type Props = {
  lat: number
  lon: number
  title: string
}

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

export const PlacesToVisitMap = ({ lat, lon, title }: Props) => {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const openExternalApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${lat},${lon}`
    const label = title
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }

  return (
    <>
      <Typography.Default ml={20} style={styles.contentTitle}>
        Карта
      </Typography.Default>
      <Animatable.View animation={zoomIn} duration={700} delay={100} style={styles.mapContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openExternalApp}
          style={[styles.mapView, { height: width / 1.15 }]}
        >
          <MapView
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
        </TouchableOpacity>
      </Animatable.View>
    </>
  )
}
