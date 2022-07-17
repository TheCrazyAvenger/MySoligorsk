import { Colors, Screens } from '@/constants'
import { BottomSheet } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  title?: string
  uris?: string[]
  uri?: string
  index?: number
  onChange: (...args: any) => any
  showClose?: boolean
}

export const ImageInput = ({ title, uri, uris, index, onChange, showClose = false }: Props) => {
  const navigation = useNavigation<any>()
  const { width } = useWindowDimensions()
  const { colors } = useTheme()

  const handleGoToPhoto = () =>
    navigation.navigate(Screens.placesToVisitPhoto, { uris, index, title, showReport: false })
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
        <TouchableRipple
          borderless
          onPress={() => onChange(uri)}
          style={[styles.closeButton, { backgroundColor: colors.error }]}
        >
          <Icon name={'close'} color={Colors.white} size={20} />
        </TouchableRipple>
      )}
      <TouchableRipple
        borderless
        // disabled={showClose
        style={[styles.container, { width: width / 3.75, height: width / 3.75 }]}
        onPress={() => (showClose ? handleGoToPhoto() : handleOpenMenu())}
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
