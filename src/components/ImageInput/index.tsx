import { Colors } from '@/constants'
import { BottomSheet } from '@/ui'
import React, { useState } from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  uri?: string
  onChange: (...args: any) => any
  showClose?: boolean
}

export const ImageInput = ({ uri, onChange, showClose = false }: Props) => {
  const { width } = useWindowDimensions()

  const openGalery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 4, quality: 0.5 })
      .then((image) => {
        image?.assets && onChange(image.assets?.[0].uri)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleMakePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }).then((image) => {
      image?.assets && onChange(image.assets?.[0].uri)
      handleCloseMenu()
    })
  }

  const handlePickPhotoFromGalery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 4, quality: 0.5 }).then((image) => {
      image?.assets && image.assets.map((item) => onChange(item.uri))
      handleCloseMenu()
    })
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuData = [
    { title: 'Сделать фото', icon: 'camera', onPress: handleMakePhoto },
    { title: 'Выбрать из галереи (макс. 6)', icon: 'images', onPress: handlePickPhotoFromGalery },
  ]
  const handleOpenMenu = () => setIsMenuVisible(true)
  const handleCloseMenu = () => setIsMenuVisible(false)

  return (
    <View>
      {showClose && (
        <TouchableRipple borderless onPress={() => onChange(uri)} style={styles.closeButton}>
          <Icon name={'close'} color={Colors.white} size={20} />
        </TouchableRipple>
      )}
      <TouchableRipple
        borderless
        disabled={showClose}
        style={[styles.container, { width: width / 2.35, height: width / 2.35 }]}
        onPress={handleOpenMenu}
      >
        <View style={[StyleSheet.absoluteFillObject, styles.inner]}>
          {uri ? (
            <Image source={{ uri }} style={styles.image} />
          ) : (
            <Icon name={'camera'} color={Colors.white} size={60} />
          )}
        </View>
      </TouchableRipple>
      <BottomSheet data={menuData} onClose={setIsMenuVisible} isVisible={isMenuVisible} />
    </View>
  )
}
