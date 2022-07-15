import { mapDarkStyle } from '@/constants'
import { Typography } from '@/ui'
import React from 'react'
import { Linking, Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  lat: number
  lon: number
  title: string
}

export const PlacesToVisitMap = ({ lat, lon, title }: Props) => {
  const { width } = useWindowDimensions()

  const { dark } = useTheme()

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
            customMapStyle={dark ? mapDarkStyle : []}
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
