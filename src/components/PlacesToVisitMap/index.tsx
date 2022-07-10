import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Linking, Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { TouchableRipple } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'

type Props = {
  lat: number
  lon: number
  title: string
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
      <Typography.H4 ml={20}>Карта</Typography.H4>
      <View style={styles.mapContainer}>
        <TouchableRipple borderless onPress={openExternalApp} style={[styles.mapView, { height: width / 1.15 }]}>
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
        </TouchableRipple>
      </View>
    </>
  )
}
